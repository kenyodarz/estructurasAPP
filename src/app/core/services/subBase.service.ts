// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Observable } from 'rxjs';
import { SubBase } from '../models/subBase';

@Injectable({
  providedIn: 'root',
})
export class SubBaseService extends CommonService<SubBase, string> {
  protected API_URL: string = `${API_URL}/bases/subbases/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerSubBasePorBases(id: string): Observable<SubBase> {
    return this.http.get<SubBase>(`${this.API_URL}obtener/${id}`);
  }

  guardarSubBaseConBase(idBase: string, subBase: SubBase): Observable<SubBase> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<SubBase>(
      `${this.API_URL}guardar/${idBase}`,
      JSON.stringify(subBase),
      {
        headers: headers,
      },
    );
  }
}
