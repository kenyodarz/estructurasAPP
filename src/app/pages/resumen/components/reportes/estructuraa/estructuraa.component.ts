import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Estructura } from 'src/app/core/models/estructura';
import { EstructuraService } from 'src/app/core/services/estructura.service';

@Component({
  selector: 'app-estructuraa',
  templateUrl: './estructuraa.component.html',
  styleUrls: ['./estructuraa.component.css'],
})
export class EstructuraaComponent implements OnInit {
  items: MenuItem[];
  selectedEstructura: Estructura = null;
  estructuras: Estructura[] = [];
  constructor(
    private estructuraService: EstructuraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  obtenerEstructuras() {
    this.estructuraService.getAll().subscribe((array: Estructura[]) => {
      let estructuras: Estructura[] = [];
      array.forEach((estructura) => {
        estructuras.push(estructura);
      });
      this.estructuras = estructuras.sort(function (a, b) {
        // if (a.numEstructura > b.numEstructura) {
        //   return 1;
        // }
        // if (a.numEstructura < b.numEstructura) {
        //   return -1;
        // }
        return 0;
      });
      console.log(this.estructuras);
    });
  }

  ngOnInit(): void {
     this.obtenerEstructuras();
  }
  
}
