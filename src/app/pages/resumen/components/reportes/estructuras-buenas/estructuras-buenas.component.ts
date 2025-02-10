import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Estructura } from 'src/app/core/models/estructura';
import { EstructuraService } from 'src/app/core/services/estructura.service';

@Component({
  selector: 'app-estructuras-buenas',
  templateUrl: './estructuras-buenas.component.html',
  styleUrls: ['./estructuras-buenas.component.css'],
})
export class EstructurasBuenasComponent implements OnInit {
  selectedEstructura: Estructura = null;
  estructuras: Estructura[] = [];
  items: MenuItem[];

  constructor(
    private estructuraService: EstructuraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
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
  // onVerCableConductor(){
  //    this.router.navigateByUrl('resumen/reportes/estructurasBuenas/cableConductor');
  // }
  ngOnInit(): void {
    this.obtenerEstructuras();
    this.route.paramMap.subscribe((params) => {
      const idInspeccion: string = params.get('id');
      this.router.navigateByUrl(`resumen/reportes/estructurasBuenas`);
    });
    this.items = [
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
    ];
  }
}
