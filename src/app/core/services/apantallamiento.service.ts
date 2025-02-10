// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Apantallamiento } from 'src/app/core/models/apantallamiento';

@Injectable({
  providedIn: 'root',
})
export class ApantallamientoService extends CommonService<
  Apantallamiento,
  string
> {
  protected API_URL: string = `${API_URL}/apantallamientos/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
