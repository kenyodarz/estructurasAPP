// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Observable } from 'rxjs';
import { Fase } from '../models/fase';

@Injectable({
  providedIn: 'root',
})
export class FaseService extends CommonService<Fase, string> {
  protected API_URL: string = `${API_URL}/aislamientos/fases/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerFaseconAislamiento(id: string): Observable<Fase> {
    return this.http.get<Fase>(`${this.API_URL}obtener/${id}`);
  }

  guardarFaseconAislamiento(
    idAisladores: string,
    fase: Fase,
  ): Observable<Fase> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Fase>(
      `${this.API_URL}guardar/${idAisladores}`,
      JSON.stringify(fase),
      {
        headers: headers,
      },
    );
  }
}
