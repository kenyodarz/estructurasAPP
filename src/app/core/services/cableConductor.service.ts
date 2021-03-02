// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { CableConductor } from '../models/cableConductor';

@Injectable({
  providedIn: 'root',
})
export class cableConductorService extends CommonService<
  CableConductor,
  string
> {
  protected API_URL: string = `${API_URL}/cables-conductores/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
