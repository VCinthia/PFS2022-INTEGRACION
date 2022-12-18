import { Escuela } from "src/escuela/escuela.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    private idCiudad : number;
    @Column()
    private nombre : string;

    @OneToMany(type => Escuela,//una ciudad puede tener muchas escuelas
    escuela => escuela.ciudad)
    @JoinColumn()
    public escuelas : Escuela[];

    constructor( nombre : string){
        this.nombre = nombre;
    };
    
    public getIdCiudad() : number { return this.idCiudad; }
    public getNombre() : string { return this.nombre; }
    public setNombre(nombre : string): void { this.nombre = nombre; }
}