import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RespuestaService {
  private url = `${environment.base}/respuestas`;
  private listaCambio = new Subject<Respuesta[]>();

  constructor(private http: HttpClient) {}

  // Listar todas las respuestas
  list() {
    return this.http.get<Respuesta[]>(this.url);
  }

  // Insertar nueva respuesta
  insert(respuesta: Respuesta) {
    return this.http.post(this.url, respuesta);
  }

  // Actualizar respuesta existente
  update(respuesta: Respuesta) {
    return this.http.put(this.url, respuesta);
  }

  // Eliminar respuesta por ID
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Buscar por ID
  listId(id: number) {
    return this.http.get<Respuesta>(`${this.url}/${id}`);
  }

  // Observable para reactualizar la tabla después de cambios
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Respuesta[]) {
    this.listaCambio.next(listaNueva);
  }
}
