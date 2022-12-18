import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClaseDTO } from './clase.dto';
import { Clase } from './clase.entity';
import { ClaseService } from './clase.service';

@Controller('clase')
export class ClaseController {
    constructor( private claseService : ClaseService ){}

    @Get()
    private listarTodas() : Clase[] | any {
        return this.claseService.getAll();
    }

    @Get(':id')
    private listarUna(@Param('id') id : number) : Clase[] | any {
        return this.claseService.getById(id);
    }

    /* @Post()
    private crear(@Body() claseDTo : ClaseDTO) : Promise <Clase>{
        return this.claseService.add(claseDTo);
    }
 */
    @Post()
    private add(@Body() claseDTO : ClaseDTO) : Promise <any>{
        return this.claseService.addClaseEstudiantes(claseDTO);
    }

    @Put(':id')
    private editar(@Param('id') id : number, @Body() claseDTo : ClaseDTO) : Promise <Clase>{
        return this.claseService.edit(id, claseDTo); 
    }

    @Delete(':id')
    private eliminar(@Param('id') id : number) : Promise<Boolean> {
        return this.claseService.delete(id);
    }

}
