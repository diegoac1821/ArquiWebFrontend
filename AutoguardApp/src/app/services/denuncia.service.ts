import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Denuncia } from '../models/denuncia';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private url = `${base_url}/denuncias`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Denuncia[]>(this.url);
  }
}


