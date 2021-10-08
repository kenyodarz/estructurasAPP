// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { UbicacionOne } from '../models/ubicacionOne';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService extends CommonService<Ubicacion, string> {
  protected API_URL: string = `${API_URL}/ubicaciones/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
  asignarUbicacionOne(idUbicacion: string, ubicacionOne: UbicacionOne): Observable<Ubicacion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Ubicacion>(
      `${this.API_URL}/${idUbicacion}/asignar-ubicacionesOne`,
      ubicacionOne,
      { headers: headers }
    );
  }
  eliminarUbicacionOne(idUbicacion: string, ubicacionOne: UbicacionOne): Observable<Ubicacion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Ubicacion>(
      `${this.API_URL}/${idUbicacion}/eliminar-ubicacionesOne`,
      ubicacionOne,
      { headers: headers }
    );
  }
}
