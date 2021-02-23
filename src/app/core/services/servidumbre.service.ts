// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Servidumbre } from 'src/app/core/models/servidumbre';

@Injectable({
  providedIn: 'root',
})
export class ServidumbreService extends CommonService<Servidumbre, string> {
  protected API_URL: string = `${API_URL}/servidumbre/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
