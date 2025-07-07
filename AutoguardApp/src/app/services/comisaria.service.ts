import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comisaria } from '../models/comisaria';
import { Observable, Subject } from 'rxjs';
import { buscarcomisariaDTO } from '../models/buscarcomisariaDTO';
import { CantDenunciasComisariaDTO } from '../models/cantDenunciasComisariaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ComisariaService {
  private url = `${base_url}/comisarias`;
  private listaCambio = new Subject<Comisaria[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comisaria[]>(this.url);
  }

  insert(comisaria: Comisaria) {
    return this.http.post(this.url, comisaria);
  }

  update(comisaria: Comisaria) {
    return this.http.put(this.url, comisaria);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Comisaria>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Comisaria[]) {
    this.listaCambio.next(listaNueva);
  }
   getSearchComisaria(): Observable<buscarcomisariaDTO[]> {
    return this.http.get<buscarcomisariaDTO[]>(`${this.url}/buscarDistrito`);
  }

 getQuantity():Observable<CantDenunciasComisariaDTO[]>{
    return this.http.get<CantDenunciasComisariaDTO[]>(`${this.url}/denunciasxcomisaria`);

  }

   getComisariaporDistrito(distrito: string): Observable<Comisaria[]>  {
    return this.http.get<Comisaria[]>(`${this.url}/buscarDistrito?distrito=${distrito}`);
  }

}

