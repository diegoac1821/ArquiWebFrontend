import { Vehiculo } from "./vehiculo";

export class Ruta{
    id:number=0 
    origenLatitud:string=""
    origenLongitud:string=""
    destinoLatitud:string=""
    destinoLongitud:string=""
    fecha:Date = new Date(Date.now())
    duracion:string=""
    distancia:number=0    
    vehiculo:Vehiculo=new Vehiculo()   
}