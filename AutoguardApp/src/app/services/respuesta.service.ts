import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from '../models/respuesta';
import { environment } from '../../environments/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
    private url = `${base_url}/respuestas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Respuesta[]>(this.url);
  }
}
