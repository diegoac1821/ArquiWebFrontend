import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ubicacion_registro } from '../models/ubicacion_registro';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UbicacionRegistroService {
 private apiUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCldiPAKk-qJibbdeFxKD7Q1OT4N6Ybop0&libraries=places/ubicaciones';  
 private url = `${base_url}/ubicaciones`;
   private listaCambio = new Subject<ubicacion_registro[]>();
 
   constructor(private http: HttpClient) {}
 
   list() {
     return this.http.get<ubicacion_registro[]>(this.url);
   }
 
   insert(comisaria: ubicacion_registro) {
     return this.http.post(this.url, comisaria);
   }
 
   update(comisaria: ubicacion_registro) {
     return this.http.put(this.url, comisaria);
   }
 
   delete(id: number) {
     return this.http.delete(`${this.url}/${id}`);
   }
 
   listId(id: number) {
     return this.http.get<ubicacion_registro>(`${this.url}/${id}`);
   }
 
   getList() {
     return this.listaCambio.asObservable();
   }
 
   setList(listaNueva: ubicacion_registro[]) {
     this.listaCambio.next(listaNueva);
   }
    getUbicaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
