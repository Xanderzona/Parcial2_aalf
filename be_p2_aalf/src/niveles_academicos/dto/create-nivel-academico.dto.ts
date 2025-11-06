import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNivelAcademicoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El campo nombre no debe ser mayor a 20 caracteres' })
  readonly nombre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(500, { message: 'El campo descripcion no debe ser mayor a 500 caracteres' })
  readonly descripcion?: string;
}
