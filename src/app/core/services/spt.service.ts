// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Spt } from 'src/app/core/models/spt';

@Injectable({
  providedIn: 'root',
})
export class SptService extends CommonService<Spt, string> {
  protected API_URL: string = `${API_URL}/spts/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
