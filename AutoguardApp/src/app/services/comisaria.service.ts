import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comisaria } from '../models/comisaria';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComisariaService {

  private url = `${base_url}/comisarias`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comisaria[]>(this.url);
  }
}
//leslie
