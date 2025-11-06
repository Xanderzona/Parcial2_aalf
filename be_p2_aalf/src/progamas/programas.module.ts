import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Programa])],
  controllers: [ProgramasController],
  providers: [ProgramasService],
})
export class ProgramasModule {}
