import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProfesorDTO } from './profesor.dto';
import { Profesor } from './profesor.entity';

@Injectable()
export class ProfesorService {
    private profesores : Profesor [] = [];
    constructor(
        @InjectRepository(Profesor)
        private readonly profesorRepository : Repository<Profesor>){}

    public async getAll() : Promise<Profesor[]> { //funciona ok
        try {
            let criterio : FindManyOptions = {relations : ['clases']}
            let profesores : Profesor[] = await this.profesorRepository.find(criterio);
            if(profesores)
                return profesores;
            else
                throw new Error('No se encontraron Profesores.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: ' + error},
                HttpStatus.NOT_FOUND);
        }
    }

    public async getById(id : number) : Promise<Profesor>{//funciona ok
        try {
            let criterio : FindOneOptions = { relations : ['clases'], where : {idProfesor : id}}
            let profesor : Profesor = await this.profesorRepository.findOne(criterio);
            if(profesor)
                return profesor;
            else
                throw new Error('Profesor no se encuentra.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: '+ id + ':' + error},
                HttpStatus.NOT_FOUND);
        }
    }    
    public async add(profesorDTO : ProfesorDTO) : Promise<Profesor>{
        try {
            let profesor : Profesor = await this.profesorRepository.save(new Profesor(
                profesorDTO.apellidoNombres
            ));
            if(profesor)
                return profesor;
            else
                throw new Error('Profesor no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: '+ error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async edit(id : number, profesorDTO : ProfesorDTO) : Promise<Profesor>{
        try {
            let criterio  : FindOneOptions = {where : {idProfesor : id}}
            let profesor : Profesor = await this.profesorRepository.findOne(criterio);
            if(!profesor)
                throw new Error('No existe Profesor.');
            else    
                profesor.setApellidoNombre(profesorDTO.apellidoNombres);
                profesor = await this.profesorRepository.save(profesor);
            return profesor;
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la actualizacion Profesor ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async delete(id : number) : Promise<boolean>{
        try{
            const criterio : FindOneOptions = { where : {idProfesor : id}}
            let profesor : Profesor = await this.profesorRepository.findOne(criterio);
            if(!profesor)
                throw new Error('No existe Profesor.');
            else
                /* profesor =  */await this.profesorRepository.delete(id);
            return true; 
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la eliminación de : '+ id + ' : ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

}

