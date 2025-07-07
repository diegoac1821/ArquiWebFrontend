import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Alerta } from '../models/alerta';
import { Observable, Subject } from 'rxjs';
import { UsuarioConTotalAlertasDTO } from '../models/UsuarioConTotalAlertasDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
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

  update(alerta: Alerta) {
    return this.http.put(this.url, alerta);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Alerta>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Alerta[]) {
    this.listaCambio.next(listaNueva);
  }

  getQuantity(): Observable<UsuarioConTotalAlertasDTO[]> {
    return this.http.get<UsuarioConTotalAlertasDTO[]>(
      `${this.url}/usuarios_maslertas`
    );
  }

  getAlertasPorPlaca(placa: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(
      `${this.url}/alertas_vehiculo?placa=${placa}`
    );
  }
  getAlertasPorPeriodo(fecha1: string, fecha2: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(
      `${this.url}/alertas_periodo?fecha1=${fecha1}&fecha2=${fecha2}`
    );
  }
}
