import { Controller, Get, Param } from '@nestjs/common';
import { Body, Delete, Post, Put } from '@nestjs/common';
import { CiudadDTO } from './ciudad.dto';
import { Ciudad } from './ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
    constructor (private ciudadService: CiudadService){}

    @Get()
    private listarTodas() : Ciudad[] | any {
        return this.ciudadService.getAll();
    }
    @Get(':id')
    private listarUna(@Param('id') id : number) : Ciudad[] | any {
        return this.ciudadService.getById(id);
    }
    @Post()
    private crear(@Body() ciudadDTo : CiudadDTO) : Promise <Ciudad>{
        return this.ciudadService.add(ciudadDTo);
    }

    @Put(':id')
    private editar(@Param('id') id : number, @Body() ciudadDTo : CiudadDTO) : Promise <Ciudad>{
        return this.ciudadService.edit(id, ciudadDTo); 
    }

    @Delete(':id')
    private eliminar(@Param('id') id : number) : Promise<Boolean> {
        return this.ciudadService.delete(id);
    }
}
