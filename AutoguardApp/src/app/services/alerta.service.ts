import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Alerta } from '../models/alerta';
import { Observable, Subject } from 'rxjs';
import { UsuarioConTotalAlertasDTO } from '../models/UsuarioConTotalAlertasDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private url = `${environment.base}/alertas`;
  private listaCambio = new Subject<Alerta[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Alerta[]>(this.url);
  }
    insert(alerta: Alerta) {
    return this.http.post(this.url, alerta);
  }

  // Actualizar alerta existente
  update(alerta: Alerta) {
    return this.http.put(this.url, alerta);
  }

  // Eliminar alerta por ID
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Buscar por ID
  listId(id: number) {
    return this.http.get<Alerta>(`${this.url}/${id}`);
  }

  // Observable para reactualizar la tabla después de cambios
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Alerta[]) {
    this.listaCambio.next(listaNueva);
  }

  getQuantity() :Observable<UsuarioConTotalAlertasDTO[]>{
    return this.http.get<UsuarioConTotalAlertasDTO[]>(`${this.url}/usuarios_maslertas`);
  }
}
