import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';
import { NivelAcademico } from './entities/nivel-academico.entity';

@Injectable()
export class NivelesAcademicosService {
  constructor(
    @InjectRepository(NivelAcademico)
    private nivelesAcademicosRepository: Repository<NivelAcademico>,
  ) {}

  async create(createNivelAcademicoDto: CreateNivelAcademicoDto): Promise<NivelAcademico> {
    const existe = await this.nivelesAcademicosRepository.findOneBy({
      nombre: createNivelAcademicoDto.nombre.trim(),
    });

    if (existe) {
      throw new NotFoundException(
        'El nivel académico ya existe en la Base de Datos con ese nombre',
      );
    }

    return this.nivelesAcademicosRepository.save({
      nombre: createNivelAcademicoDto.nombre.trim(),
      descripcion: createNivelAcademicoDto.descripcion?.trim(),
    });
  }

  async findAll(): Promise<NivelAcademico[]> {
    return this.nivelesAcademicosRepository.find({
      order: {
        nombre: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<NivelAcademico> {
    const nivelAcademico = await this.nivelesAcademicosRepository.findOneBy({ id });
    if (!nivelAcademico) {
      throw new NotFoundException(`El nivel académico con el id: ${id} no existe`);
    }
    return nivelAcademico;
  }

  async update(
    id: number,
    updateNivelAcademicoDto: UpdateNivelAcademicoDto,
  ): Promise<NivelAcademico> {
    const nivelAcademico = await this.findOne(id);
    const nivelAcademicoUpdate = Object.assign(nivelAcademico, updateNivelAcademicoDto);
    return this.nivelesAcademicosRepository.save(nivelAcademicoUpdate);
  }

  async remove(id: number) {
    const nivelAcademico = await this.findOne(id);
    return this.nivelesAcademicosRepository.softRemove(nivelAcademico);
  }
}
