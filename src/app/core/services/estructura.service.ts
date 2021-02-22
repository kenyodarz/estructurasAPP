// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Estructura } from 'src/app/core/models/estructura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstructuraService extends CommonService<Estructura, string> {
  protected API_URL: string = `${API_URL}/estructuras/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  buscarTorresPorNumero(numEstrutura: String, circuito: String): Observable<Estructura>{
    return this.http.get<Estructura>(
      `${this.API_URL}numero/${numEstrutura}/${circuito}`
    );
  }
}
