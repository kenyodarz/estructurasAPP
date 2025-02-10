// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Estructuraa } from 'src/app/core/models/estructuraa';

@Injectable({
  providedIn: 'root',
})
export class EstructuraaService extends CommonService<Estructuraa, string> {
  protected API_URL: string = `${API_URL}/torres/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
