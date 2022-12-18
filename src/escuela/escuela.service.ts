import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions,  Repository } from 'typeorm';
import { EscuelaDTO } from './escuela.dto';
import { Escuela } from './escuela.entity';

@Injectable()
export class EscuelaService {
    //private escuelas : Escuela[] = [];
    constructor (
        @InjectRepository(Escuela)
        private readonly escuelaRepository : Repository<Escuela>
    ) {}

    public async getAll() : Promise <Escuela[]>{// funciona, trae las clases de cada escuela
        try{
            let criterio : FindManyOptions = {relations : ['clases']} //FindOptions no funciona
            let escuelas : Escuela [] = await this.escuelaRepository.find(criterio);
            if (escuelas)
                return escuelas;
            else
                throw new Error('No se encuentran escuelas.')    
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: '+ error},
                HttpStatus.NOT_FOUND);
        }
    }

    public async getByID(id : number) : Promise<Escuela>{// funciona OK
        try{
            let criterio : FindOneOptions = {relations :  ['clases'], where : {idEscuela : id}}
            let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
            if(escuela)
                return escuela;
            else
                throw new Error('No existe la escuela.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: '+ id +':'+ error},
                HttpStatus.NOT_FOUND);
        }
    }

    public async add(escuelaDTO : EscuelaDTO) : Promise<Escuela>{
        try {
            let escuela : Escuela = await this.escuelaRepository.save(new Escuela(
                escuelaDTO.nombre, escuelaDTO.domicilio, escuelaDTO.idCiudad
            ));
            if(escuela)
                return escuela;
            else
                throw new Error('La escuela no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: '+ error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async edit(id : number, escuelaDTO : EscuelaDTO) : Promise<Escuela>{
        try {
            let criterio  : FindOneOptions = {where : {idEscuela : id}}
            let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
            if(!escuela)
                throw new Error('No existe la escuela.');
            else    
                escuela.setNombre(escuelaDTO.nombre);
                escuela.setDomicilio(escuelaDTO.domicilio);
                escuela = await this.escuelaRepository.save(escuela);
            return escuela;
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la actualizacion de escuela ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async delete(id : number) : Promise<boolean>{
        try{
            const criterio : FindOneOptions = { where : {idEscuela : id}}
            let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
            if(!escuela)
                throw new Error('No existe la escuela.');
            else
                /* escuela =  */await this.escuelaRepository.delete(id);
            return true; 
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la eliminación de : '+ id + ' : ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

}
