// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Estado } from 'src/app/core/models/estado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoService extends CommonService<Estado, string> {
  protected API_URL: string = `${API_URL}/apantallamientos/estados/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerEstadoPorApantallamiento(id: string): Observable<Estado>{
    return this.http.get<Estado>(`${this.API_URL}obtener/${id}`)
  }

}
