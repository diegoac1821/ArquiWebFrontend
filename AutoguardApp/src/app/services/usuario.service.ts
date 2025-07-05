import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject, Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Usuario[]> {
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

  listId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  buscarPorUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/buscar-por-username/${username}`);
  }

  getList(): Observable<Usuario[]> {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Usuario[]): void {
    this.listaCambio.next(listaNueva);
  }

  cambiarEstado(id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}/estado`, {});
  }
}
