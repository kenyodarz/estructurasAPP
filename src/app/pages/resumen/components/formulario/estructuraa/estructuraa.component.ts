import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Router, Params } from '@angular/router';

// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';

import { FormularioService } from 'src/app/core/services/formulario.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estructuraa',
  templateUrl: './estructuraa.component.html',
  styleUrls: ['./estructuraa.component.css'],
})
export class EstructuraaComponent implements OnInit {
  funcionOptions: any[];
  tipoOpcions: any[];
  pinturaOpcions: any[];
  angulosOpcions: any[];
  riesgoElectricoOpcions: any[];
  vialOpcions: any[];
  nomenclaturaOpcions: any[];
  formulario: Formulario = new Formulario();
  formEstructuraa: FormGroup;

  constructor(
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.funcionOptions = [
      { label: 'RETENCIÓN', value: 'retencion' },
      { label: 'SUSPENSIÓN', value: 'suspension' },
      { label: 'TRANSPOSICIÓN', value: 'transposicion' },
    ];
    this.tipoOpcions = [
      { label: 'TORRECILLA', value: 'torrecilla' },
      { label: 'TORRE EN CELOSIA', value: 'torre' },
      { label: 'TUBOS', value: 'tubos' },
      { label: 'POSTES METALICOS', value: 'metalicos' },
      { label: 'POSTES EN FIBRA', value: 'fibra' },
    ];
    this.pinturaOpcions = [
      { label: 'NO TIENE', value: 'no' },
      { label: 'BUEN ESTADO', value: 'buen' },
      { label: 'MAL ESTADO', value: 'mal' },
    ];
    this.angulosOpcions = [
      { label: 'MAL ESTADO', value: 'mal' },
      { label: 'FALTANTES', value: 'faltantes' },
      { label: 'DEFORMADOS', value: 'deformados' },
      { label: 'SUELTOS', value: 'sueltos' },
      { label: 'CORROSIÓN', value: 'corrosion' },
      { label: 'BUEN ESTADO', value: 'buen' },
    ];
    this.riesgoElectricoOpcions = [
      { label: 'BUEN ESTADO', value: 'mal' },
      { label: 'MAL ESTADO', value: 'faltantes' },
      { label: 'NO TIENE', value: 'deformados' },
    ];
    this.vialOpcions = [
      { label: 'SI TIENE', value: 'mal' },
      { label: 'NO TIENE', value: 'faltantes' },
      { label: 'NO APLICA', value: 'deformados' },
    ];
    this.nomenclaturaOpcions = [
      { label: 'BUEN ESTADO', value: 'mal' },
      { label: 'MAL ESTADO', value: 'faltantes' },
      { label: 'NO TIENE', value: 'deformados' },
    ];
  }
  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.estructura != null) {
          // Aca va el nuevo Formulario
          // this.formInformacion.patchValue(formulario.estructura);
        }
      });
  }
  onSubmit() {}
  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'estructuraa',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/cable-conductor/${formulario.idInspeccion}`
        );
      });
  }
  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
     this.guardarFormulario();
  }
  prevPage() {}

  ngOnInit(): void {}
}
