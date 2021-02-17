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
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.css'],
})
export class EstructuraComponent implements OnInit {
  estructura: Estructura = new Estructura();
  formEstructura: FormGroup;
  stateOptions: { label: string; value: boolean }[];
  displayModal: boolean = true;
  
  constructor(
    private estructuraService: EstructuraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

     this.stateOptions = [
       { label: 'Publico', value: true },
       { label: 'Privado', value: false },
     ];
  }
  showModalDialog() {
    this.displayModal = true;
  }
}
