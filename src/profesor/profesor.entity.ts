/*idProfesor int PK - apellidoNombres varchar(45)*/

import { Clase } from "src/clase/clase.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    private idProfesor : number;
    @Column()
    private apellidoNombres : string;
    @OneToMany(type => Clase, //un profesor puede tener muchas clases
    clase => clase.profesor)
    @JoinColumn()
    public clases : Clase[];
       

    constructor(apellidoNombre : string) {
        this.apellidoNombres = apellidoNombre;
    };

    public getIdProfesor() : number { return this. idProfesor };
    public getApellidoNombre() : string { return this.apellidoNombres };
    public setApellidoNombre(apellidoNombre : string ) : void { this.apellidoNombres = apellidoNombre };

}