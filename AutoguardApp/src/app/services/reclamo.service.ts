import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reclamo } from '../models/reclamo';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
   private url = `${base_url}/reclamos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Reclamo[]>(this.url);
  }

  
}
