import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfesorDTO } from './profesor.dto';
import { Profesor } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {
    constructor(private profesorService : ProfesorService){}

    @Get()
    private listarTodas() : Profesor[] | any {
        return this.profesorService.getAll();
    }

    @Get(':id')
    private listarUna(@Param('id') id : number) : Profesor[] | any {
        return this.profesorService.getById(id);
    }

    @Post()
    private crear(@Body() profesorDTo : ProfesorDTO) : Promise <Profesor>{
        return this.profesorService.add(profesorDTo);
    }

    @Put(':id')
    private editar(@Param('id') id : number, @Body() profesorDTo : ProfesorDTO) : Promise <Profesor>{
        return this.profesorService.edit(id, profesorDTo); 
    }

    @Delete(':id')
    private eliminar(@Param('id') id : number) : Promise<Boolean> {
        return this.profesorService.delete(id);
    }
}

