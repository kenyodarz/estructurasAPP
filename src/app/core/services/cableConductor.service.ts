// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { CableConductor } from '../models/cableConductor';
import { Empalme } from '../models/empalme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class cableConductorService extends CommonService<
  CableConductor,
  string
> {
  protected API_URL: string = `${API_URL}/cables-conductores/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  asignarEmpalme(
    idCableConductor: string,
    empalme: Empalme
  ): Observable<CableConductor> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<CableConductor>(
      `${this.API_URL}/${idCableConductor}/asignar-empalmes`,
      empalme,
      { headers: headers }
    );
  }
  eliminarEmpalme(
    idCableConductor: string,
    empalme: Empalme
  ): Observable<CableConductor> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<CableConductor>(
      `${this.API_URL}/${idCableConductor}/eliminar-empalmes`,
      empalme,
      { headers: headers }
    );
  }
}
