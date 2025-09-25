import {
  Body,
  Controller,
  Delete,
  Headers,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import {
  buscarPasswordDto,
  cambiarPasswordMasterDto,
  createPasswordDto,
  loginDto,
  verPasswordDto,
} from './auth.dto';
import {
  BearerAuthToken,
  VersionDescription,
} from 'src/decorators/controller.decorator';

@ApiTags('[auth] autenticacion'.toUpperCase())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() body: loginDto) {
    return this.authService.login(body);
  }

  @Post('agregar-password')
  @BearerAuthToken()
  @VersionDescription('1', 'Servico para crear de los Usuarios')
  createUsuarios(
    @Body() body: createPasswordDto,
    @Headers() header: { authorization: any },
  ) {
    return this.authService.createPassword({ body, header });
  }

  @Post('ver-passwords')
  @BearerAuthToken()
  @VersionDescription('1', 'Servico para crear de los Usuarios')
  verPasswords(
    @Body() body: verPasswordDto,
    @Headers() header: { authorization: any },
  ) {
    return this.authService.verPasswords({ body, header });
  }

  @Post('buscar-passwords')
  @BearerAuthToken()
  @VersionDescription('1', 'Servico para crear de los Usuarios')
  buscarPasswords(
    @Body() body: buscarPasswordDto,
    @Headers() header: { authorization: any },
  ) {
    return this.authService.buscarPasswords({ body, header });
  }

  @Post('cambiar-password-master')
  @BearerAuthToken()
  @VersionDescription('1', 'Servico para cambiar la contraseña master')
  cambiarPasswords(
    @Body() body: cambiarPasswordMasterDto,
    @Headers() header: { authorization: any },
  ) {
    return this.authService.cambiarPasswordsMaster({ body, header });
  }

  @Delete('passwords/:id')
  @BearerAuthToken()
  @VersionDescription('1', 'Servico para eliminar una contraseña')
  deletePasswords(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: number,
    @Headers() header: { authorization: any },
  ) {
    return this.authService.deletePasswords({ id, header });
  }
}
