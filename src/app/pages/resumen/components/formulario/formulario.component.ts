import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'estructura',
        routerLink: 'estructuras',
      },
      {
        label: 'apantallamiento',
        routerLink: 'apantallamiento',
      },
      {
        label: 'estructuraa',
        routerLink: 'estructuraa',
      },
      {
        label: 'cableConductor',
        routerLink: 'cableConductor',
      },
      {
        label: 'aislamiento',
        routerLink: 'aislamiento',
      },
      {
        label: 'bases',
        routerLink: 'bases',
      },
      {
        label: 'spt',
        routerLink: 'spt',
      },
      {
        label: 'servidumbre',
        routerLink: 'servidumbre',
      },
      {
        label: 'transposicion',
        routerLink: 'transposicion',
      },
      {
        label: 'ubicacion',
        routerLink: 'ubicacion',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
  }
}
