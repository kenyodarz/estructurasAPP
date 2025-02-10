// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Aislamiento } from '../models/aislamiento';
import { Fase } from '../models/fase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AislamientoService extends CommonService<Aislamiento, string> {
  protected API_URL: string = `${API_URL}/aislamientos/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  asignarFases(idAislamiento: string, fase: Fase): Observable<Aislamiento> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Aislamiento>(
      `${this.API_URL}/${idAislamiento}/asignar-fases`,
      fase,
      { headers: headers },
    );
  }
  eliminarFases(idAislamiento: string, fase: Fase): Observable<Aislamiento> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Aislamiento>(
      `${this.API_URL}/${idAislamiento}/eliminar-fases`,
      fase,
      { headers: headers },
    );
  }
}
