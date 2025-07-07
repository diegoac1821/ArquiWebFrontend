import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/rol';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/Rol`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Roles[]>(this.url);
  }
  cambiarRol(id: number, nuevoRol: string) {
    return this.http.put(`${this.url}/cambiar-rol/${id}`, nuevoRol, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text', 
    });
  }
}
