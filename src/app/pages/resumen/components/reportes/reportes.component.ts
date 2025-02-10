import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { PersonaService } from 'src/app/core/services/persona.service';
// Model
import { Persona } from 'src/app/core/models/persona';
import { Formulario } from 'src/app/core/models/formulario';
import { Estructura } from 'src/app/core/models/estructura';
import { EstructuraService } from 'src/app/core/services/estructura.service';

@Component({
  selector: 'app-home',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  estructura: Estructura = new Estructura();
  selectedEstructura: Estructura = null;
  estructuras: Estructura[] = [];
  formEstructura: UntypedFormGroup;
  displaySaveEditModal: boolean = false;
  stateOptions: any[];

  items: MenuItem[] = [];
  title: string = '';
  constructor(
    private estructuraService: EstructuraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
  ) {}

  obtenerEstructuras() {
    this.estructuraService.getAll().subscribe((array: Estructura[]) => {
      let estructuras: Estructura[] = [];
      array.forEach((estructura) => {
        estructuras.push(estructura);
      });
      this.estructuras = estructuras.sort(function (a, b) {
        if (a.numEstructura > b.numEstructura) {
          return 1;
        }
        if (a.numEstructura < b.numEstructura) {
          return -1;
        }
        return 0;
      });
      console.log(this.estructuras);
    });
  }

  onVerEstructura(estructura: Estructura) {
    console.log(estructura);
    this.router.navigateByUrl('resumen/reportes' + estructura);
  }

  onVerEstructurasBuenas() {
    this.router.navigateByUrl('resumen/reportes/estructurasBuenas');
  }

  onVerEstructurasMalas() {
    this.router.navigateByUrl('resumen/reportes/estructurasMalas');
  }

  ngOnInit(): void {
    this.obtenerEstructuras();
    this.formEstructura = this.fb.group({
      idEstructura: new UntypedFormControl(),
      numEstructura: new UntypedFormControl(),
      circuito: new UntypedFormControl(),
      ubicacion: new UntypedFormControl(),
      predioPublico: new UntypedFormControl(),
      coordinadaX: new UntypedFormControl(),
      coordinadaY: new UntypedFormControl(),
      alturaSobreNivelMar: new UntypedFormControl(),
    });
    // this.items = [
    //   {
    //     label: 'Estructuras en mal estado',
    //     // icon: '',

    //     routerLink: ['/resumen/reportes/estructurasMalas'],
    //   },
    //   {
    //     label: 'Estructuras en buen estado',
    //     icon: '',
    //     // this.router.navigateByUrl('resumen/reporte/estructurasBuenas/')
    //    routerLink: ['/resumen/reportes/estructurasBuenas'],
    //   },
    // ];
  }
}
