import { Injectable } from '@nestjs/common';
import {
  dataResponseError,
  dataResponseSuccess,
  IResponse,
} from 'src/dto/response.dto';
import {
  buscarPasswordDto,
  cambiarPasswordMasterDto,
  createPasswordDto,
  loginDto,
  verPasswordDto,
} from './auth.dto';
import { PrismaService } from 'src/database/prima.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EncryptionService } from './encryption.service';

export interface tokenPayload {
  id: number;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  userName: string;
  celular: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly dataBase: PrismaService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async login(params: loginDto): Promise<IResponse> {
    try {
      const usuario = await this.dataBase.usuarios.findFirst({
        where: { userName: params.userName },
      });

      if (!usuario) return dataResponseError('El usuariuo no existe');

      const pass = await this.dataBase.password.findFirst({
        where: { usuarioId: usuario.id, esMaster: 1 },
      });

      const comparePassword: boolean = await compare(
        params.password,
        pass!.password,
      );

      if (!comparePassword)
        return dataResponseError('La contraseña es incorrecta.', {
          status: 401,
        });

      return await this.dataToken({
        id: usuario.id,
        nombres: usuario.nombres,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
        celular: usuario.celular,
        userName: usuario.userName,
        email: usuario.email,
      });
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async dataToken(payload: tokenPayload): Promise<IResponse> {
    try {
      const [token, tokenRefresh] = await Promise.all([
        this.jwtService.sign(payload, {
          expiresIn: `3600S`,
          secret: process.env.JWT_SECRET, //RECODE verficar el secret_key
        }),
        this.jwtService.sign(payload, { expiresIn: `3600S` }),
      ]);
      return dataResponseSuccess({
        data: {
          token,
          tokenRefresh,
          userName: payload.userName,
          email: payload.email,
        },
      });
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async createPassword(params: {
    body: createPasswordDto;
    header: any;
  }): Promise<IResponse> {
    try {
      const { body, header } = params;
      // Validaciones básicas
      if (!header?.authorization) {
        return dataResponseError('Authorization header missing');
      }
      const token = header.authorization.split(' ')[1];
      if (!token) {
        return dataResponseError('Token no proporcionado');
      }
      let payload: any;
      try {
        payload = this.jwtService.verify(token);
      } catch (err) {
        return dataResponseError('Token inválido');
      }

      const usuarioId = payload?.id;
      if (!usuarioId) {
        return dataResponseError('Token no contiene id de usuario');
      }
      const { encrypted, salt } = await this.encryptionService.encrypt(
        body.password,
        body.masterKey,
      );

      const create = await this.dataBase.password.create({
        data: {
          usuarioId,
          esMaster: 0,
          titulo: body.titulo,
          password: encrypted,
          salt: salt,
          url: body.url,
          usuario: body.usuario,
          creadoEn: new Date().toISOString(),
          actualizadoEn: new Date().toISOString(),
        },
      });

      return dataResponseSuccess({ data: create });
    } catch (error) {
      console.log(error);
      return dataResponseError(error.message);
    }
  }

  async verPasswords(params: {
    body: verPasswordDto;
    header: any;
  }): Promise<IResponse> {
    try {
      const { body, header } = params;
      // Validaciones básicas
      if (!header?.authorization) {
        return dataResponseError('Authorization header missing');
      }
      const token = header.authorization.split(' ')[1];
      if (!token) {
        return dataResponseError('Token no proporcionado');
      }
      let payload: any;
      try {
        payload = this.jwtService.verify(token);
      } catch (err) {
        return dataResponseError('Token inválido');
      }

      const usuarioId = payload?.id;
      if (!usuarioId) {
        return dataResponseError('Token no contiene id de usuario');
      }

      const passwords = await this.dataBase.password.findMany({
        where: { usuarioId, esMaster: 0 },
      });

      for (const key in passwords) {
        if (!Object.hasOwn(passwords, key)) continue;

        const element = passwords[key];
        console.log(element);
        const decrypted = await this.encryptionService.decrypt(
          element.password,
          element.salt,
          body.masterKey,
        );
        passwords[key].password = decrypted;
      }

      return dataResponseSuccess({ data: passwords });
    } catch (error) {
      console.log(error);
      return dataResponseError(error.message);
    }
  }

  async buscarPasswords(params: {
    body: buscarPasswordDto;
    header: any;
  }): Promise<IResponse> {
    try {
      const { body, header } = params;
      // Validaciones básicas
      if (!header?.authorization) {
        return dataResponseError('Authorization header missing');
      }
      const token = header.authorization.split(' ')[1];
      if (!token) {
        return dataResponseError('Token no proporcionado');
      }
      let payload: any;
      try {
        payload = this.jwtService.verify(token);
      } catch (err) {
        return dataResponseError('Token inválido');
      }

      const usuarioId = payload?.id;
      if (!usuarioId) {
        return dataResponseError('Token no contiene id de usuario');
      }

      const passwords = await this.dataBase.password.findMany({
        where: { usuarioId, esMaster: 0, url: { contains: body.url } },
      });

      for (const key in passwords) {
        if (!Object.hasOwn(passwords, key)) continue;

        const element = passwords[key];
        console.log(element);
        const decrypted = await this.encryptionService.decrypt(
          element.password,
          element.salt,
          body.masterKey,
        );
        passwords[key].password = decrypted;
      }

      return dataResponseSuccess({ data: passwords });
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async cambiarPasswordsMaster(params: {
    body: cambiarPasswordMasterDto;
    header: any;
  }): Promise<IResponse> {
    try {
      const { body, header } = params;
      // Validaciones básicas
      if (!header?.authorization) {
        return dataResponseError('Authorization header missing');
      }
      const token = header.authorization.split(' ')[1];
      if (!token) {
        return dataResponseError('Token no proporcionado');
      }
      let payload: any;
      try {
        payload = this.jwtService.verify(token);
      } catch (err) {
        return dataResponseError('Token inválido');
      }

      const usuarioId = payload?.id;
      if (!usuarioId) {
        return dataResponseError('Token no contiene id de usuario');
      }

      const hashedPassword = await bcrypt.hash(String(body.newMasterKey), 12);

      const update = await this.dataBase.password.updateMany({
        where: {
          usuarioId,
          esMaster: 1,
        },
        data: {
          password: hashedPassword,
          actualizadoEn: new Date().toISOString(),
        },
      });

      const passwords = await this.dataBase.password.findMany({
        where: { usuarioId, esMaster: 0 },
      });

      for (const key in passwords) {
        if (!Object.hasOwn(passwords, key)) continue;

        const element = passwords[key];
        console.log(element);
        const decrypted = await this.encryptionService.decrypt(
          element.password,
          element.salt,
          body.masterKey,
        );
        passwords[key].password = decrypted;

        const { encrypted, salt } = await this.encryptionService.encrypt(
          decrypted,
          body.newMasterKey,
        );

        const updatePassword = await this.dataBase.password.update({
          where: { id: element.id },
          data: {
            password: encrypted,
            salt: salt,
            actualizadoEn: new Date().toISOString(),
          },
        });
      }

      return dataResponseSuccess({ data: passwords });
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async deletePasswords(params: {
    id: number;
    header: any;
  }): Promise<IResponse> {
    try {
      const { id, header } = params;
      if (!header?.authorization) {
        return dataResponseError('Authorization header missing');
      }
      const token = header.authorization.split(' ')[1];
      if (!token) {
        return dataResponseError('Token no proporcionado');
      }
      let payload: any;
      try {
        payload = this.jwtService.verify(token);
      } catch (err) {
        return dataResponseError('Token inválido');
      }

      const usuarioId = payload?.id;
      if (!usuarioId) {
        return dataResponseError('Token no contiene id de usuario');
      }

      const passwords = await this.dataBase.password.delete({
        where: { usuarioId, esMaster: 0, id },
      });

      return dataResponseSuccess({ data: passwords });
    } catch (error) {
      return dataResponseError(error.message);
    }
  }
}
