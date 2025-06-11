import { Dispositivo_GPS } from "./dispositivo_GPS";

export class ubicacion_registro {
    id:number=0
    latitud:string=""
    longitud:string=""
    fecha:Date = new Date(Date.now())
    hora:number=0
    dgps:Dispositivo_GPS=new Dispositivo_GPS()   
}