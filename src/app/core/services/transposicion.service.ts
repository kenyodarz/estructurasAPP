// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Transposicion } from 'src/app/core/models/transposicion';

@Injectable({
  providedIn: 'root',
})
export class TransposicionService extends CommonService<Transposicion, string> {
  protected API_URL: string = `${API_URL}/transposiciones/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
