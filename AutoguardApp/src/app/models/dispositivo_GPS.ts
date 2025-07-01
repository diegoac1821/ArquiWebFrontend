import { Vehiculo } from "./vehiculo";

export class Dispositivo_GPS{
    id:number=0 
    numeroSerie:string=""
    precio:number=0
    fechaAdquisicion:Date = new Date()
    vehiculo:Vehiculo=new Vehiculo()   
}