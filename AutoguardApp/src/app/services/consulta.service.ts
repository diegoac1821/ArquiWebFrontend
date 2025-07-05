import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Consulta } from '../models/consulta';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { CantConsultasxUsuarioDTO } from '../models/cantConsultasxUsuarioDTO';

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
    const prompt = `Eres un asistente especializado en temas vehiculares.
Solo puedes responder preguntas sobre vehículos, rutas, dispositivos GPS, seguridad vial y denuncias relacionadas con vehículos.
Si la pregunta no está relacionada con esos temas, responde exactamente con:
"Lo siento, solo puedo ayudarte con temas vehiculares."

Además, tu respuesta no debe superar los 1000 caracteres. 
Pregunta del usuario: "${mensaje}"`;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const apiKey = 'AIzaSyCaFF12cp6ywFINlt6CTDuMx6JW_XJyEbA'; // clave de prueba

    return this.http.post<any>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getQuantity(): Observable<CantConsultasxUsuarioDTO[]> {
    return this.http.get<CantConsultasxUsuarioDTO[]>(
      `${this.url}/cantidadconsultas`
    );
  }
}
