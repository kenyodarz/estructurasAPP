// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Observable } from 'rxjs';
import { Deshilachado } from '../models/deshilachado';

@Injectable({
  providedIn: 'root',
})
export class DeshilachadoService extends CommonService<Deshilachado, string> {
  protected API_URL: string = `${API_URL}/cables-conductores/deshilachados/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerDeshilachadoPorCableConductor(id: string): Observable<Deshilachado> {
    return this.http.get<Deshilachado>(`${this.API_URL}obtener/${id}`);
  }

  guardarDeshilachadoConConductor(
    idCableConductor: string,
    deshilachado: Deshilachado,
  ): Observable<Deshilachado> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Deshilachado>(
      `${this.API_URL}guardar/${idCableConductor}`,
      JSON.stringify(deshilachado),
      {
        headers: headers,
      },
    );
  }
}
