import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private readonly programasRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    const existe = await this.programasRepository.findOneBy({
      nombre: createProgramaDto.nombre.trim(),
      idNivelAcademico: createProgramaDto.idNivelAcademico,
    });

    if (existe) {
      throw new ConflictException(
        'El programa ya existe en la Base de Datos con ese nombre y nivel académico',
      );
    }

    const nuevoPrograma = this.programasRepository.create({
      idNivelAcademico: createProgramaDto.idNivelAcademico,
      nombre: createProgramaDto.nombre.trim(),
      descripcion: createProgramaDto.descripcion.trim(),
      version: createProgramaDto.version,
      duracionMeses: createProgramaDto.duracionMeses,
      costo: createProgramaDto.costo,
      fechaInicio: createProgramaDto.fechaInicio,
      estado: createProgramaDto.estado,
      areaConocimiento: createProgramaDto.areaConocimiento,
    });

    return this.programasRepository.save(nuevoPrograma);
  }

  async findAll(areaConocimiento?: string): Promise<Programa[]> {
    const query = this.programasRepository
      .createQueryBuilder('programa')
      .leftJoinAndSelect('programa.nivelAcademico', 'nivelAcademico')
      .orderBy('nivelAcademico.nombre', 'ASC');

    if (areaConocimiento) {
      query.where('programa.areaConocimiento = :area', { area: areaConocimiento });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programasRepository.findOneBy({ id });
    if (!programa) {
      throw new NotFoundException(`El programa con el id: ${id} no existe`);
    }
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);
    const programaUpdate = Object.assign(programa, updateProgramaDto);
    return this.programasRepository.save(programaUpdate);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programasRepository.softRemove(programa);
  }
}
