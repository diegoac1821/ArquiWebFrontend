export class Usuario{
    id:number=0
    dni:number=0
    nombres:string=""
    apellidos:string=""
    direccion:string=""
    correo_electronico:string=""
    fechaNacimiento:Date = new Date(Date.now())
    edad:number=0
    telefono:number=0
    username:string=""
    password:string=""
    enabled:boolean=false;
}