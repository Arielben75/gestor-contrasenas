import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams, Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class loginDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El userName de usuario debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El userName de usuario debe estar en formato string' })
  @IsNotEmpty({ message: 'El userName de usuario no debe estar vacio' })
  @ApiProperty({ description: 'userName del Usuario', required: true })
  userName: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El password debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El password debe estar en formato string' })
  @IsNotEmpty({ message: 'El password no debe estar vacio' })
  @ApiProperty({ description: 'password del Usuario', required: true })
  password: string;
}

export class createPasswordDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El password debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El password debe estar en formato string' })
  @IsNotEmpty({ message: 'El password no debe estar vacio' })
  @ApiProperty({ description: 'password del Usuario', required: true })
  password: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message: 'El url debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El url debe estar en formato string' })
  @IsNotEmpty({ message: 'El url no debe estar vacio' })
  @ApiProperty({ description: 'url del Usuario', required: true })
  url: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message: 'El usuario debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El usuario debe estar en formato string' })
  @IsNotEmpty({ message: 'El usuario no debe estar vacio' })
  @ApiProperty({ description: 'usuario del Usuario', required: true })
  usuario: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message: 'El titulo debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El titulo debe estar en formato string' })
  @IsNotEmpty({ message: 'El titulo no debe estar vacio' })
  @ApiProperty({ description: 'titulo del Usuario', required: true })
  titulo: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El masterKey debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El masterKey debe estar en formato string' })
  @IsNotEmpty({ message: 'El masterKey no debe estar vacio' })
  @ApiProperty({ description: 'masterKey del Usuario', required: true })
  masterKey: string;
}

export class verPasswordDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El masterKey debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El masterKey debe estar en formato string' })
  @IsNotEmpty({ message: 'El masterKey no debe estar vacio' })
  @ApiProperty({ description: 'masterKey del Usuario', required: true })
  masterKey: string;
}

export class buscarPasswordDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El masterKey debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El masterKey debe estar en formato string' })
  @IsNotEmpty({ message: 'El masterKey no debe estar vacio' })
  @ApiProperty({ description: 'masterKey del Usuario', required: true })
  masterKey: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message: 'El url debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El url debe estar en formato string' })
  @IsNotEmpty({ message: 'El url no debe estar vacio' })
  @ApiProperty({ description: 'url del Usuario', required: true })
  url: string;
}

export class cambiarPasswordMasterDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El masterKey debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El masterKey debe estar en formato string' })
  @IsNotEmpty({ message: 'El masterKey no debe estar vacio' })
  @ApiProperty({ description: 'masterKey del Usuario', required: true })
  masterKey: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toString().trim() || null : value,
  )
  @Type(() => String)
  @Length(2, 100, {
    message:
      'El newMasterKey debe ser de mas de 2 caracteres asta un maximo de 100',
  })
  @IsString({ message: 'El newMasterKey debe estar en formato string' })
  @IsNotEmpty({ message: 'El newMasterKey no debe estar vacio' })
  @ApiProperty({ description: 'newMasterKey del Usuario', required: true })
  newMasterKey: string;
}
