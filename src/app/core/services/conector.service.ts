// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Conector } from 'src/app/core/models/conector';

@Injectable({
  providedIn: 'root',
})
export class ConectorService extends CommonService<Conector, string> {
  protected API_URL: string = `${API_URL}/conector/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
