import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodeCrypto from 'crypto';

@Injectable()
export class EncryptionService implements OnModuleInit {
  private sodium: any;
  private readyPromise: Promise<void> | null = null;
  private ready = false;

  async onModuleInit(): Promise<void> {
    this.readyPromise = (async () => {
      const lib = await import('libsodium-wrappers');
      this.sodium = (lib && (lib.default ?? lib)) as any;
      await this.sodium.ready;
      this.ready = true;
    })();
    return this.readyPromise;
  }

  private async ensureReady(): Promise<void> {
    if (this.ready) return;
    if (!this.readyPromise) {
      throw new Error(
        'EncryptionService: inicialización no iniciada. ¿Se registró como proveedor en Nest?',
      );
    }
    await this.readyPromise;
    if (!this.ready)
      throw new Error('EncryptionService: falló inicialización de libsodium');
  }

  /**
   * encrypt: usa pbkdf2Sync para derivar clave y sodium.secretbox para cifrar.
   * Devuelve: { encrypted: base64(nonce||ciphertext), salt: base64(salt) }
   */
  async encrypt(
    text: string,
    password: string,
  ): Promise<{ encrypted: string; salt: string }> {
    await this.ensureReady();
    const sodium = this.sodium;

    // Longitudes - usa constantes de sodium si existen, si no, fallback seguro.
    const saltLen =
      typeof sodium.crypto_pwhash_SALTBYTES === 'number'
        ? sodium.crypto_pwhash_SALTBYTES
        : 16;
    const keyLen =
      typeof sodium.crypto_secretbox_KEYBYTES === 'number'
        ? sodium.crypto_secretbox_KEYBYTES
        : 32;
    const nonceLen =
      typeof sodium.crypto_secretbox_NONCEBYTES === 'number'
        ? sodium.crypto_secretbox_NONCEBYTES
        : 24;

    // genera salt y nonce con sodium (mejor RNG)
    const salt = sodium.randombytes_buf(saltLen);
    const nonce = sodium.randombytes_buf(nonceLen);

    // Derivar clave con PBKDF2 (Node): 100k iteraciones SHA-512 -> 32 bytes (o keyLen)
    const iterations = 100000;
    const derivedKeyBuffer = nodeCrypto.pbkdf2Sync(
      Buffer.from(password, 'utf8'),
      Buffer.from(salt),
      iterations,
      keyLen,
      'sha512',
    );
    const keyUint8 = new Uint8Array(derivedKeyBuffer);

    const messageBytes = sodium.from_string(text);
    const ciphertext = sodium.crypto_secretbox_easy(
      messageBytes,
      nonce,
      keyUint8,
    );

    // concatenar nonce + ciphertext
    const combined = new Uint8Array(nonce.length + ciphertext.length);
    combined.set(nonce, 0);
    combined.set(ciphertext, nonce.length);

    return {
      encrypted: sodium.to_base64(combined),
      salt: sodium.to_base64(salt),
    };
  }

  /**
   * decrypt: deriva la misma clave con pbkdf2 y abre secretbox.
   */
  async decrypt(
    encrypted: string,
    salt: string,
    password: string,
  ): Promise<string> {
    await this.ensureReady();
    const sodium = this.sodium;

    const keyLen =
      typeof sodium.crypto_secretbox_KEYBYTES === 'number'
        ? sodium.crypto_secretbox_KEYBYTES
        : 32;
    const nonceLen =
      typeof sodium.crypto_secretbox_NONCEBYTES === 'number'
        ? sodium.crypto_secretbox_NONCEBYTES
        : 24;

    const saltBytes = sodium.from_base64(salt);
    const combined = sodium.from_base64(encrypted);

    const nonce = combined.slice(0, nonceLen);
    const ciphertext = combined.slice(nonceLen);

    // Derivar clave con los mismos parámetros
    const iterations = 100000;
    const derivedKeyBuffer = nodeCrypto.pbkdf2Sync(
      Buffer.from(password, 'utf8'),
      Buffer.from(saltBytes),
      iterations,
      keyLen,
      'sha512',
    );
    const keyUint8 = new Uint8Array(derivedKeyBuffer);

    const decryptedBytes = sodium.crypto_secretbox_open_easy(
      ciphertext,
      nonce,
      keyUint8,
    );
    return sodium.to_string(decryptedBytes);
  }
}
