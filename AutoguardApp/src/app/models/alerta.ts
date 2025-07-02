import { Vehiculo } from "./vehiculo"

export class Alerta{
    id:number=0 
    asunto:string=""
    fecha:Date = new Date(Date.now())
    descripcion:string=""
    vehiculo:Vehiculo=new Vehiculo()   
}