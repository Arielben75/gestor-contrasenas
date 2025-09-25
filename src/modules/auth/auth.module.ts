import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EncryptionService } from './encryption.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, EncryptionService],
  exports: [AuthService, EncryptionService],
})
export class AuthModule {}
