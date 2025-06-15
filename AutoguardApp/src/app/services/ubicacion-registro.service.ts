import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ubicacion_registro } from '../models/ubicacion_registro';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UbicacionRegistroService {

  private url = `${base_url}/ubicacion-registros`;
    
      constructor(private http: HttpClient) {}
    
      list() {
        return this.http.get<ubicacion_registro[]>(this.url);
      }
}
