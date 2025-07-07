import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RespuestaService {
  private url = `${environment.base}/respuestas`;
  private listaCambio = new Subject<Respuesta[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Respuesta[]>(this.url);
  }

  insert(respuesta: Respuesta): Observable<Respuesta> {
  return this.http.post<Respuesta>(this.url, respuesta);
}


  update(respuesta: Respuesta) {
    return this.http.put(this.url, respuesta);
  }


  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Respuesta>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Respuesta[]) {
    this.listaCambio.next(listaNueva);
  }
}
