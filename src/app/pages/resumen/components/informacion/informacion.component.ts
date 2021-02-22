// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { EstructuraService } from 'src/app/core/services/estructura.service';
// Modelos
import { Estructura } from 'src/app/core/models/estructura';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
 estructura: Estructura = new Estructura();
  formInformacion: FormGroup;
  stateOptions: { label: string; value: boolean }[];
  displayModal: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
