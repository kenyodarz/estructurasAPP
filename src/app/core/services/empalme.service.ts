// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Observable } from 'rxjs';
import { Empalme } from '../models/empalme';

@Injectable({
  providedIn: 'root',
})
export class EmpalmeService extends CommonService<Empalme, string> {
  protected API_URL: string = `${API_URL}/cables-conductores/empalmes/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerEmpalmePorCableConductor(id: string): Observable<Empalme> {
    return this.http.get<Empalme>(`${this.API_URL}obtener/${id}`);
  }

  guardarEmpalmeConCConductor(
    idCableConductor: string,
    empalme: Empalme
  ): Observable<Empalme> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Empalme>(
      `${this.API_URL}guardar/${idCableConductor}`,
      JSON.stringify(empalme),
      {
        headers: headers,
      }
    );
  }
}
