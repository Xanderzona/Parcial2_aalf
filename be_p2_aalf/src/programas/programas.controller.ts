import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgramasService } from './programas.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@ApiTags('Programas')
@Controller('programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Post()
  create(@Body() createProgramasDto: CreateProgramaDto) {
    return this.programasService.create(createProgramasDto);
  }

  @Get()
  findAll() {
    return this.programasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramasDto: UpdateProgramaDto) {
    return this.programasService.update(+id, updateProgramasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programasService.remove(+id);
  }
}
