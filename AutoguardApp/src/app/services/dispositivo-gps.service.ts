import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dispositivo_GPS } from '../models/dispositivo_GPS';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DispositivoGPSService {

  private url = `${base_url}/gps`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Dispositivo_GPS[]>(this.url);
  }
}
