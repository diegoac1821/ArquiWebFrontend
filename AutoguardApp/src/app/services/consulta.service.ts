import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Consulta } from '../models/consulta';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private url = `${environment.base}/consultas`;
  private listaCambio = new Subject<Consulta[]>();

  constructor(private http: HttpClient) {}

  // Listar todas las consultas
  list() {
    return this.http.get<Consulta[]>(this.url);
  }

  // Insertar nueva consulta
  insert(consulta: Consulta) {
    return this.http.post(this.url, consulta);
  }

  // Actualizar consulta existente
  update(consulta: Consulta) {
    return this.http.put(this.url, consulta);
  }

  // Eliminar consulta por ID
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Buscar por ID
  listId(id: number) {
    return this.http.get<Consulta>(`${this.url}/${id}`);
  }

  // Observable para reactualizar la tabla después de cambios
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Consulta[]) {
    this.listaCambio.next(listaNueva);
  }
}