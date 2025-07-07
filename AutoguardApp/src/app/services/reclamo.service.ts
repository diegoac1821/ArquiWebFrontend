import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reclamo } from '../models/reclamo';
import { Subject } from 'rxjs';
import { ReclamoResueltosDTO } from '../models/ReclamoResueltosDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {private url = `${base_url}/reclamos`;
  private listaCambio = new Subject<Reclamo[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Reclamo[]>(this.url);
  }

  insert(reclamo: Reclamo) {
    return this.http.post(this.url, reclamo);
  }

  update(reclamo: Reclamo) {
    return this.http.put(this.url, reclamo);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Reclamo>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Reclamo[]) {
    this.listaCambio.next(listaNueva);
  }
  getReclamosSinResolver() {
  return this.http.get<ReclamoResueltosDTO[]>(`${this.url}/reclamossinresolver`);
}

}