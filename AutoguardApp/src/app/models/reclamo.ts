import { Usuario } from "./usuario"

export class Reclamo{
    id:number=0
    asunto:string=""
    fecha:Date = new Date(Date.now())
    descripcion:string=""
    resuelto:boolean=false;
    u:Usuario=new Usuario()   
}