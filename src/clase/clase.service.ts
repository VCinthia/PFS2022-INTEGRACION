import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ClaseDTO } from './clase.dto';
import { Clase } from './clase.entity';

import { Estudiante } from '../estudiante/estudiante.entity';
import { EscuelaDTO } from 'src/escuela/escuela.dto';

@Injectable()
export class ClaseService {
    private clases : Clase [] = [];
    constructor(
        @InjectRepository(Clase)
        private readonly claseRepository : Repository<Clase>,
        @InjectRepository(Estudiante)
        private readonly estudianteRepository : Repository<Estudiante>){}

    public async getAll() : Promise<Clase[]> {// ver que traiga escuela y profesor?
        //trae [] de estudiantes ok
        try {
            let criterio : FindManyOptions = {relations : ['estudiantes']}
            let clases : Clase[] = await this.claseRepository.find(criterio);
            if(clases)
                return clases;
            else
                throw new Error('No se encontraron Clases.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async getById(id : number) : Promise<Clase>{// ver que traiga escuela y profesor?
        try {
            //trae [] de estudiantes ok
            let criterio : FindOneOptions = { relations : ['estudiantes'], where : {idClase : id}}
            let clase : Clase = await this.claseRepository.findOne(criterio);
            if(clase)
                return clase;
            else
                throw new Error('Clase no se encuentra.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: '+ id + ':' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    /* public async add(claseDTO : ClaseDTO) : Promise<Clase>{ 
        try {
            let clase : Clase = await this.claseRepository.save(new Clase(
                claseDTO.nombre, claseDTO.idEscuela, claseDTO.idProfesor
            ));
            if(clase)
                return clase;
            else
                throw new Error('Clase no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: '+ error},
                HttpStatus.NOT_FOUND);
        }
    }; */

    
    public async addClaseEstudiantes(claseDTO : ClaseDTO/* , id : Estudiante[] */) : Promise<Clase>{ 
        try {
            let idEstudiantes : Estudiante[] =[]
            //console.log(idEstudiantes,'+1')
                for(let i = 0; i < claseDTO.idEstudiantes.length  ; i++){
                    /* console.log(idEstudiantes,'+2') */
                    /* let criterio : FindOneOptions = { relations : ['estudiantes'], where : {idEsdudiante : id}}
                    console.log(idEstudiantes,'+3') */
                    /* let estudiante :  Estudiante = await this.estudianteRepository.findOne(criterio); */
                    /* console.log(idEstudiantes,'+4') */
                    if(idEstudiantes)
                    idEstudiantes.push(idEstudiantes[i]);//terminar
                    //console.log(idEstudiantes,'+5');                    
                }                
            let clase : Clase = await this.claseRepository.save(new Clase(
                claseDTO.nombre, claseDTO.idEscuela, claseDTO.idProfesor, idEstudiantes = claseDTO.idEstudiantes
            ));
            if(clase)
                return clase;
            else
                throw new Error('Clase no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: '+ error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async edit(id : number, claseDTO : ClaseDTO) : Promise<Clase>{//ok
        try {
            let criterio  : FindOneOptions = {where : {idClase : id}}
            let clase : Clase = await this.claseRepository.findOne(criterio);
            if(!clase)
                throw new Error('No existe Clase.');
            else    
                clase.setNombre(claseDTO.nombre);
                clase.setEscuela(claseDTO.idEscuela);
                clase.setProfesor(claseDTO.idProfesor);
                clase = await this.claseRepository.save(clase);
            return clase;
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la actualizacion Clase ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async delete(id : number) : Promise<boolean>{
        try{
            const criterio : FindOneOptions = { where : {idClase : id}}
            let clase : Clase = await this.claseRepository.findOne(criterio);
            if(!clase)
                throw new Error('No existe Clase.');
            else
                /* clase =  */await this.claseRepository.delete(id);
            return true; 
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la eliminación de : '+ id + ' : ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

}
