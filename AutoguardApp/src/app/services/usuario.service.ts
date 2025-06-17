import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private url = `${environment.base}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  update(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
}
