import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { PersonaService } from 'src/app/core/services/persona.service';
// Model
import { Persona } from 'src/app/core/models/persona';

@Component({
  selector: 'app-home',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
       this.items = [
         {
           label: 'Estructuras en mal estado',
           icon: '',
         },
         {
           label: 'Estructuras en buen estado',
           icon: '',
         },
         
       ];
  }
}
