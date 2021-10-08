// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Observable } from 'rxjs';
import { UbicacionOne } from '../models/ubicacionOne';

@Injectable({
  providedIn: 'root',
})
export class UbicacionOneService extends CommonService<UbicacionOne, string> {
  protected API_URL: string = `${API_URL}/ubicaciones/ubicacionesOne/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerubicacionOneconUbicaciones(id: string): Observable<UbicacionOne> {
    return this.http.get<UbicacionOne>(`${this.API_URL}obtener/${id}`);
  }

  guardarUbicacionOneconUbicacion(
    idUbicacion: string,
    ubicacionOne: UbicacionOne
  ): Observable<UbicacionOne> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<UbicacionOne>(
      `${this.API_URL}guardar/${idUbicacion}`,
      JSON.stringify(ubicacionOne),
      {
        headers: headers,
      }
    );
  }
}
