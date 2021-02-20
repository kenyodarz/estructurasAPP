import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
//Modelos
import { Formulario } from 'src/app/core/models/formulario';
import { Persona } from 'src/app/core/models/persona';
// Services
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-ver-formulario',
  templateUrl: './ver-formulario.component.html',
  styleUrls: ['./ver-formulario.component.css'],
})
export class VerFormularioComponent implements OnInit {
  formulario: Formulario = new Formulario();
  constructor(
    private formularioService: FormularioService,
    private personaService: PersonaService,
    private token: TokenStorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        console.log(this.formulario);
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idInspeccion: string = params.get('id');
      this.obtenerFormulario(idInspeccion);
    });
  }
}
