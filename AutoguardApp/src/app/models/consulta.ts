import { Usuario } from "./usuario"

export class Consulta{
    id:number=0
    consulta:string=""
    fecha:Date = new Date(Date.now())
    hora:string=""
    usuario:Usuario=new Usuario()   
}