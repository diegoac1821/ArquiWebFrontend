import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Consulta } from '../models/consulta';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url = `${base_url}/consultas`; 

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Consulta[]>(this.url);
  }
}
