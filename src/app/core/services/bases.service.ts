// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Bases } from 'src/app/core/models/bases';

@Injectable({
  providedIn: 'root',
})
export class BasesService extends CommonService<Bases, string> {
  protected API_URL: string = `${API_URL}/bases/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
