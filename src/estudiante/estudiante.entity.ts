/*idEstudiante int PK - apellidoNombres varchar(45) - fechaNacimiento datetime*/

import { Clase } from "src/clase/clase.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudiantes')//nombre de la tabla
export class Estudiante {
    @PrimaryGeneratedColumn()
    private idEstudiante: number;    
    @Column()
    private apellidoNombres : string;
    @Column()
    private fechaNacimiento : Date;
    @ManyToMany(type => Clase, (clase) => clase.estudiantes)//muchas clases corresponden a muchos estudiantes
    public clases : Clase[];
    //ver los on delete on cascade
    

    constructor (apellidoNombre : string, fechaNac : Date){
        this.apellidoNombres = apellidoNombre;
        this.fechaNacimiento = fechaNac;
    };
    
    public getIdEstudiante(): number { return this.idEstudiante};
    public getApellidoNombre(): string { return this.apellidoNombres};
    public setApellidoNombre(apellidoNombre: string) : void { this.apellidoNombres = apellidoNombre };
    public getFechaNacimiento(): Date { return this.fechaNacimiento};
    public setFechaNacimiento(fechaNacimiento: Date): void { this.fechaNacimiento = fechaNacimiento };
}