// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  protected API_URL: string = `${API_URL}/cableConductores/empalmes/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerEmpalmePorCableConductor(id: string): Observable<Empalme> {
    return this.http.get<Empalme>(`${this.API_URL}obtener/${id}`);
  }
}
