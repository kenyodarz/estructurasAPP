// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Ubicacion } from 'src/app/core/models/ubicacion';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService extends CommonService<Ubicacion, string> {
  protected API_URL: string = `${API_URL}/ubicacion/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
