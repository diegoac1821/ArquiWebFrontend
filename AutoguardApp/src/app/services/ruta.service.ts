import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ruta } from '../models/ruta';
import { Subject } from 'rxjs';
import { RutasperiodoplacaDTO } from '../models/RutasperiodoplacaDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RutaService {
  private url = `${base_url}/rutas`;
  private listaCambio = new Subject<Ruta[]>();


  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Ruta[]>(this.url);
  }

  insert(comisaria: Ruta) {
    return this.http.post(this.url, comisaria);
  }

  update(comisaria: Ruta) {
    return this.http.put(this.url, comisaria);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Ruta>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Ruta[]) {
    this.listaCambio.next(listaNueva);
  }
  getRutasPeriodoPlaca(params: { fecha1: string; fecha2: string; placa: string }) {
  return this.http.get<RutasperiodoplacaDTO[]>(`${this.url}/rutas_periodo_placa`, {
    params
  });
}
}
