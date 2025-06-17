import { Comisaria } from "./comisaria"
import { Vehiculo } from "./vehiculo"

export class Denuncia{
    id:number=0
    descripcion:string=""
    motivo:string=""
    estado:string=""
    comisaria:Comisaria=new Comisaria()   
    vehiculo:Vehiculo=new Vehiculo()   

}