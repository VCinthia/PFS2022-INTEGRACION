import { Escuela } from "src/escuela/escuela.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('clases')
export class Clase {
    @PrimaryGeneratedColumn()
    private idClase : number;
    @Column()
    private nombre : string;

    @ManyToOne(type => Escuela,//una clase corresponde a una unica escuela (?)
    escuela => escuela.clases)
    @JoinColumn()
    public escuela : Escuela;  

    @ManyToOne(type => Profesor,//una clase corresponde a un unico profesor
    profesor => profesor.clases)
    @JoinColumn()
    public profesor : Profesor; 

    //tabla intermedia entre estudiantes y clases: puede ir el manytomany de cualquier lado
    @ManyToMany(type => Estudiante,(estudiante) => estudiante.clases)//muchas clases corresponden a muchos estudiantes
    @JoinTable()
    public estudiantes : Estudiante[];
    //ver los on delete on cascade

    constructor( nombre : string, escuela : Escuela, profesor : Profesor, idEstudiantes : Estudiante[]){
        this.nombre = nombre;
        this.escuela = escuela;
        this.profesor = profesor;
        this.estudiantes = idEstudiantes;
    };
    
    public getIdCiudad() : number { return this.idClase; }
    public getNombre() : string { return this.nombre; }
    public setNombre(nombre : string): void { this.nombre = nombre; }
    public setEscuela(escuela : Escuela): void { this.escuela = escuela; }
    public setProfesor(profesor : Profesor): void { this.profesor = profesor; }
}