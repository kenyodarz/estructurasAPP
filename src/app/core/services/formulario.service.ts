// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Formulario } from 'src/app/core/models/formulario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormularioService extends CommonService<Formulario, string> {
  protected API_URL: string = `${API_URL}/inspecciones/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
  guardarObservacionesConInspeccion(
    idInspeccion: string,
    observacion: Formulario
  ): Observable<Formulario> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Formulario>(
      `${this.API_URL}guardar/${idInspeccion}`,
      JSON.stringify(observacion),
      {
        headers: headers,
      }
    );
  }
}
