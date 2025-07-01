import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dispositivo_GPS } from '../models/dispositivo_GPS';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DispositivoGPSService {

  private url = `${base_url}/gps`;
  private listaCambio = new Subject<Dispositivo_GPS[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Dispositivo_GPS[]>(this.url);
  }
  
  insert(dispositivo_gps: Dispositivo_GPS) {
    return this.http.post(this.url, dispositivo_gps);
  }

  update(dispositivo_gps: Dispositivo_GPS) {
    return this.http.put(this.url, dispositivo_gps);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Dispositivo_GPS>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Dispositivo_GPS[]) {
    this.listaCambio.next(listaNueva);
  }

}
