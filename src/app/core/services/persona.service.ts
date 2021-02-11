// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Persona } from 'src/app/core/models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService extends CommonService<Persona, string> {
  protected API_URL: string = `${API_URL}/personas/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
