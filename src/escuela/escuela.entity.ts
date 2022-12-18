/* idEscuela int PK - nombre varchar(45) - domicilio varchar(45) - idCiudad int */

import { Ciudad } from "src/ciudad/ciudad.entity";
import { Clase } from "src/clase/clase.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('escuelas')//nombre de la tabla
export class Escuela {
    @PrimaryGeneratedColumn()
    private idEscuela : number;
    @Column() 
    private nombre : string;
    @Column() 
    private domicilio : string;

    @ManyToOne(type => Ciudad,//una escuela puede una ciudad
    ciudad => ciudad.escuelas)
    @JoinColumn()
    public ciudad : Ciudad;

    @OneToMany(type => Clase,//una escuela puede tener muchas clases
    clase => clase.escuela)
    @JoinColumn()
    public clases : Clase[];
    

    constructor(nombre : string, domicilio : string, ciudad : Ciudad){        
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.ciudad = ciudad //ver FK OK - revisar nombre columna ciudad en escuela
    }

    public getIdEscuela() : number { return this.idEscuela };
    public getNombre() : string { return this.nombre };
    public setNombre( nombre : string ) : void { this.nombre = nombre };
    public getDomicilio() : string { return this.domicilio };
    public setDomicilio( domicilio : string ) : void { this.domicilio = domicilio };
    public getIdCiudad() : Ciudad { return this.ciudad };
    public setIdCiudad( ciudad : Ciudad ) : void { this.ciudad = ciudad };
}