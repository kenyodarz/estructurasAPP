// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Formulario } from 'src/app/core/models/formulario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormularioService extends CommonService<Formulario, string> {
  protected API_URL: string = `${API_URL}/formularios/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

}
