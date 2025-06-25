import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url = `${base_url}/vehiculos`;
  private listaCambio = new Subject<Vehiculo[]>();

  
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<Vehiculo[]>(this.url);
    }
  
    delete(placa: number) {
      return this.http.delete(`${this.url}/${placa}`);
    }
  
    listId(placa: number) {
      return this.http.get<Vehiculo>(`${this.url}/${placa}`);
    }
  
    setList(listaNueva: Vehiculo[]) {
      this.listaCambio.next(listaNueva);
    }
}
