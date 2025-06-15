import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url = `${base_url}/vehiculos`;
  
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<Vehiculo[]>(this.url);
    }
}
