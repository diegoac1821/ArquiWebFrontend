import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Denuncia } from '../models/denuncia';
import { Observable, Subject } from 'rxjs';
import { buscarcomisariaDTO } from '../models/buscarcomisariaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {
  private url = `${environment.base}/denuncias`;
  private listaCambio = new Subject<Denuncia[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Denuncia[]>(this.url);
  }
  insert(denuncia: Denuncia) {
    return this.http.post(this.url, denuncia);
  }


  update(denuncia: Denuncia) {
    return this.http.put(this.url, denuncia);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Denuncia>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Denuncia[]) {
    this.listaCambio.next(listaNueva);
  }

buscarPorEstado(estado: string): Observable<Denuncia[]> {
  const params = new HttpParams().set('estado', estado);
  return this.http.get<Denuncia[]>(`${this.url}/Denuncias`, { params });
}

}
