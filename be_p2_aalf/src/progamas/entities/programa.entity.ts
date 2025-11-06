import { NivelAcademico } from '../../niveles_academicos/entities/nivel-academico.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('programas')
export class Programa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'id_nivel_academico' })
  idNivelAcademico: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 2000 })
  descripcion: string;

  @Column('int')
  version: number;

  @Column('int', { name: 'duracion_meses' })
  duracionMeses: number;

  @Column('decimal', { precision: 10, scale: 2 })
  costo: number;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio: Date;

  @Column('varchar', { length: 20 })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', select: false })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => NivelAcademico, { eager: true })
  @JoinColumn({ name: 'id_nivel_academico' })
  nivelAcademico: NivelAcademico;
}
