// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Conector } from 'src/app/core/models/conector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConectorService extends CommonService<Conector, string> {
  protected API_URL: string = `${API_URL}/conector/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

 obtenerConectorPorApantallamiento(id: string): Observable<Conector>{
   return this.http.get<Conector>(`${this.API_URL}obtener/${id}`);
 }

}
