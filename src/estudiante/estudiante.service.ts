import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { EstudianteDTO } from './estudiante.dto';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
    private estudiantes : Estudiante[] = [];
    constructor (
        @InjectRepository(Estudiante)
        private readonly estudianteRepository : Repository <Estudiante>){}
    
    public async getAll() : Promise <Estudiante[]> {
        try {
            let criterio : FindManyOptions = { relations : ['clases']}
            let estudiantes : Estudiante [] = await this.estudianteRepository.find(criterio);
            if(estudiantes)
                return estudiantes;
            else 
                throw new Error('No se encontraron estudiantes.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: ' + error},
                HttpStatus.NOT_FOUND);
        }
    }

    public async getById (id : number) : Promise <Estudiante> {
        try {
            let criterio : FindOneOptions = { relations : ['clases'], where :{idEstudiante : id}}
            let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
            if(estudiante)
                return estudiante;
            else
                throw new Error ('No se encontró el estudiante.')
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la busqueda: ' + id + ':' + error},
                HttpStatus.NOT_FOUND);
        }
    }
    public async add(estudianteDTO : EstudianteDTO) : Promise<Estudiante>{
        try {
            let estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(
                estudianteDTO.apellidoNombres, estudianteDTO.fechaNacimiento
            ));
            if(estudiante)
                return estudiante;
            else
                throw new Error('El estudiante no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: '+ error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async edit(id : number, estudianteDTO : EstudianteDTO) : Promise<Estudiante>{
        try {
            let criterio  : FindOneOptions = {where : {idEstudiante : id}}
            let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
            if(!estudiante)
                throw new Error('No existe el estudiante.');
            else    
                estudiante.setApellidoNombre(estudianteDTO.apellidoNombres);
                estudiante.setFechaNacimiento(estudianteDTO.fechaNacimiento);
                estudiante = await this.estudianteRepository.save(estudiante);
            return estudiante;
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la actualizacion de estudiante ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

    public async delete(id : number) : Promise<boolean>{
        try{
            const criterio : FindOneOptions = { where : {idEstudiante : id}}
            let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
            if(!estudiante)
                throw new Error('No existe el estudiante.');
            else
                /* estudiante =  */await this.estudianteRepository.delete(id);
            return true; 
        } catch (error) {
            throw new HttpException({
                status : HttpStatus.NOT_FOUND,
                error : 'Error en la eliminación de : '+ id + ' : ' + error},
                HttpStatus.NOT_FOUND);
        }
    };

}
