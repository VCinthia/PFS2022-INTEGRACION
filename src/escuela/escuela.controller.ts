import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EscuelaDTO } from './escuela.dto';
import { Escuela } from './escuela.entity';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController {
    constructor ( private escuelaService : EscuelaService ) {}

    @Get()
    private listarTodas() : Escuela [] | any {
        return this.escuelaService.getAll();
    }
    @Get(':id')
    private listarUna(@Param('id') id : number) : Escuela [] | any {
        return this.escuelaService.getByID(id);
    }
    @Post()
    private crear(@Body() escuelaDTo : EscuelaDTO) : Promise <Escuela>{
        return this.escuelaService.add(escuelaDTo);
    }

    @Put(':id')
    private editar(@Param('id') id : number, @Body() escuelaDTo : EscuelaDTO) : Promise <Escuela>{
        return this.escuelaService.edit(id, escuelaDTo); 
    }

    @Delete(':id')
    private eliminar(@Param('id') id : number) : Promise<Boolean> {
        return this.escuelaService.delete(id);
    }
}
