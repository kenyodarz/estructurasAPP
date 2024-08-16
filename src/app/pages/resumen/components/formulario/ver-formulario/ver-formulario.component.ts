import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';

import { PersonaService } from 'src/app/core/services/persona.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-ver-formulario',
  templateUrl: './ver-formulario.component.html',
  styleUrls: ['./ver-formulario.component.css'],
})
export class VerFormularioComponent implements OnInit {
  items: MenuItem[];
  
  constructor(
    private personaService: PersonaService,
    private token: TokenStorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idInspeccion: string = params.get('id');
      this.router.navigateByUrl(
        `resumen/formulario/ver/${idInspeccion}/informacion/${idInspeccion}`
      );
    });
      this.items = [
        {
          label: 'Información',
          routerLink: 'informacion',
        },
        {
          label: 'Apantallamiento',
          routerLink: 'apantallamiento',
        },
        {
          label: 'Estructuraa',
          routerLink: 'estructuraa',
        },
        {
          label: 'CableConductor',
          routerLink: 'cable-conductor',
        },
        {
          label: 'Aislamiento',
          routerLink: 'aislamiento',
        },
        {
          label: 'Bases',
          routerLink: 'bases',
        },
        {
          label: 'SPT',
          routerLink: 'spt',
        },
        {
          label: 'Servidumbre',
          routerLink: 'servidumbre',
        },
        {
          label: 'Transposicion',
          routerLink: 'transposicion',
        },
        {
          label: 'Ubicacion',
          routerLink: 'ubicacion',
        },
        {
          label: 'Observación',
          routerLink: 'observacion',
        },
        {
          label: 'Confirmación',
          routerLink: 'confirmacion',
        },
      ];
  }
}
