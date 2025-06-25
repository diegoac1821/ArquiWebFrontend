import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ubicacion_registro } from '../models/ubicacion_registro';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UbicacionRegistroService {

  private url = `${base_url}/ubicaciones`;
  private listaCambio = new Subject<ubicacion_registro[]>();
    

      constructor(private http: HttpClient) {}
    
     // Listar todas las consultas
       list() {
         return this.http.get<ubicacion_registro[]>(this.url);
       }
     
       // Insertar nueva consulta
       insert(consulta: ubicacion_registro) {
         return this.http.post(this.url, ubicacion_registro);
       }
     
       // Actualizar consulta existente
       update(consulta: ubicacion_registro) {
         return this.http.put(this.url, ubicacion_registro);
       }
     
       // Eliminar consulta por ID
       delete(id: number) {
         return this.http.delete(`${this.url}/${id}`);
       }
     
       // Buscar por ID
       listId(id: number) {
         return this.http.get<ubicacion_registro>(`${this.url}/${id}`);
       }
     
       // Observable para reactualizar la tabla después de cambios
       getList() {
         return this.listaCambio.asObservable();
       }
     
       setList(listaNueva: ubicacion_registro[]) {
         this.listaCambio.next(listaNueva);
       }
}
