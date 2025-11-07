import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProgramaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo idNivelAcademico no debe ser vacío' })
  @IsNumber({}, { message: 'El campo idNivelAcademico debe ser de tipo numérico' })
  readonly idNivelAcademico: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
  @MinLength(4, { message: 'El campo nombre no debe ser menor a 4 caracteres' })
  readonly nombre: string;
  @ApiProperty()
  @IsString({ message: 'El campo areaConocimiento debe ser de tipo cadena' })
  @MaxLength(10, { message: 'El campo areaConocimiento no debe ser mayor a 100 caracteres' })
  readonly areaConocimiento: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(2000, { message: 'El campo descripcion no debe ser mayor a 2000 caracteres' })
  @MinLength(4, { message: 'El campo descripcion no debe ser menor a 4 caracteres' })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo version no debe ser vacío' })
  @IsNumber({}, { message: 'El campo version debe ser de tipo numérico' })
  readonly version: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracionMeses no debe ser vacío' })
  @IsNumber({}, { message: 'El campo duracionMeses debe ser de tipo numérico' })
  readonly duracionMeses: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo costo no debe ser vacío' })
  readonly costo: number;

  @ApiProperty({ example: '2025-11-06' })
  @IsNotEmpty({ message: 'El campo fechaInicio no debe ser vacío' })
  @IsDateString({}, { message: 'El campo fechaInicio debe ser de tipo fecha' })
  readonly fechaInicio: Date;
  
  @ApiProperty({ enum: ['En Planificación', 'En curso', 'Finalizado'] })
  @IsNotEmpty({ message: 'El campo estado no debe ser vacío' })
  @IsString({ message: 'El campo estado debe ser de tipo cadena' })
  @IsEnum(['En Planificación', 'En curso', 'Finalizado'], {
    message: 'El campo estado debe ser uno de: En Planificación, En curso, Finalizado',
  })
  @MaxLength(20, { message: 'El campo estado no debe ser mayor a 20 caracteres' })
  readonly estado: string;
}
