import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EstudianteDTO } from './estudiante.dto';
import { Estudiante } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
    constructor (private estudianteService : EstudianteService){}

    @Get()
    private listarTodas() : Estudiante[] | any {
        return this.estudianteService.getAll();
    }

    @Get(':id')
    private listarUna(@Param('id') id : number) : Estudiante [] | any {
        return this.estudianteService.getById(id);
    }
    @Post()
    private crear(@Body() estudianteDTO : EstudianteDTO) : Promise <Estudiante>{
        return this.estudianteService.add(estudianteDTO);
    }

    @Put(':id')
    private editar(@Param('id') id : number, @Body() estudianteDTO : EstudianteDTO) : Promise <Estudiante>{
        return this.estudianteService.edit(id, estudianteDTO); 
    }

    @Delete(':id')
    private eliminar(@Param('id') id : number) : Promise<Boolean> {
        return this.estudianteService.delete(id);
    }
}