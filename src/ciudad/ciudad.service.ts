import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CiudadDTO } from './ciudad.dto';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    private ciudades : Ciudad[] = [];
    constructor (
        @InjectRepository(Ciudad)
        private readonly ciudadRepository : Repository<Ciudad>){}

    public async getAll() : Promise <Ciudad[]> {// ok, trae la lista de escuelas de cada ciudad
        try{
            let criterio : FindManyOptions = {relations : ['escuelas']}
            let ciudades : Ciudad [] = await this.ciudadRepository.find(criterio);
            if (ciudades)
                return ciudades;
            else
                throw new Error('No se encuentran ciudades.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async getById(id : number) : Promise<Ciudad>{// ok, trae la lista de escuelas de cada ciudad
        try{
            let criterio : FindOneOptions = {relations : ['escuelas'], where : {idCiudad : id}}
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(ciudad)
                return ciudad;
            else
                throw new Error('La ciudad no se encuentra.');   
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: '+ id + ' : ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async add(ciudadDTO : CiudadDTO) : Promise<Ciudad>{
        try {
            let ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(
                ciudadDTO.nombre
            ));
            if(ciudad)
                return ciudad;
            else
            throw new Error('La ciudad no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: '+ error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async edit(id : number, ciudadDTO : CiudadDTO) : Promise<Ciudad>{
        try {
            let criterio  : FindOneOptions = {where : {idCiudad : id}}
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(!ciudad)
                throw new Error('No existe la ciudad.');
            else    
                ciudad.setNombre(ciudadDTO.nombre);
                ciudad = await this.ciudadRepository.save(ciudad);
            return ciudad;
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la actualizacion de ciudad ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async delete(id : number) : Promise<boolean>{
        try{
            const criterio : FindOneOptions = { where : {idCiudad : id}}
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(!ciudad)
                throw new Error('No existe la ciudad.');
            else
                /* ciudad =  */await this.ciudadRepository.delete(id);
            return true; 
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la eliminación de : '+ id + ' : ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

}
