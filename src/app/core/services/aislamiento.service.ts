// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Aislamiento } from 'src/app/core/models/aislamiento';

@Injectable({
  providedIn: 'root',
})
export class AislamientoService extends CommonService<Aislamiento, string> {
  protected API_URL: string = `${API_URL}/aislamiento/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
