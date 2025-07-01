import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Consulta } from '../models/consulta';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private url = `${environment.base}/consultas`;
  private listaCambio = new Subject<Consulta[]>();

  constructor(private http: HttpClient) {}

  // Listar todas las consultas
  list() {
    return this.http.get<Consulta[]>(this.url);
  }

  // Insertar nueva consulta
  insert(consulta: Consulta): Observable<Consulta> {
  return this.http.post<Consulta>(`${this.url}`, consulta);
}


  // Actualizar consulta existente
  update(consulta: Consulta) {
    return this.http.put(this.url, consulta);
  }

  // Eliminar consulta por ID
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Buscar por ID
  listId(id: number) {
    return this.http.get<Consulta>(`${this.url}/${id}`);
  }

  // Observable para reactualizar la tabla después de cambios
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Consulta[]) {
    this.listaCambio.next(listaNueva);
  }
  chatbotResponder(mensaje: string) {
    const body = {
      contents: [
        {
          parts: [{ text: mensaje }],
        },
      ],
    };

    const apiKey = 'AIzaSyAK4ytmqUFnU-Dyj48ojNncGFi6jAK-HsQ'; // Tu clave de prueba

    return this.http.post<any>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
