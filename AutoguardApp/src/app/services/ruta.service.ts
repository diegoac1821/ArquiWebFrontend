import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ruta } from '../models/ruta';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private url = `${base_url}/rutas`;
    
      constructor(private http: HttpClient) {}
    
      list() {
        return this.http.get<Ruta[]>(this.url);
      }
}
