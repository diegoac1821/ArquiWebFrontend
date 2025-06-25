import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ruta } from '../models/ruta';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private url = `${base_url}/rutas`;
  private listaCambio = new Subject<Ruta[]>();
  
      constructor(private http: HttpClient) {}
    
    // Listar todas las consultas
      list() {
        return this.http.get<Ruta[]>(this.url);
      }
    
      // Insertar nueva consulta
      insert(ruta: Ruta) {
        return this.http.post(this.url, ruta);
      }
    
      // Actualizar consulta existente
      update(ruta: Ruta) {
        return this.http.put(this.url, ruta);
      }
    
      // Eliminar consulta por ID
      delete(id: number) {
        return this.http.delete(`${this.url}/${id}`);
      }
    
      // Buscar por ID
      listId(id: number) {
        return this.http.get<Ruta>(`${this.url}/${id}`);
      }
    
      // Observable para reactualizar la tabla después de cambios
      getList() {
        return this.listaCambio.asObservable();
      }
    
      setList(listaNueva: Ruta[]) {
        this.listaCambio.next(listaNueva);
      }
}
