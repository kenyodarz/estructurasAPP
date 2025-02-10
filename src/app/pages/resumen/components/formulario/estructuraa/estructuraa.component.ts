import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Router, Params } from '@angular/router';

// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';

import { EstructuraaService } from 'src/app/core/services/estructuraa.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Estructuraa } from 'src/app/core/models/estructuraa';

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

  formEstructuraa: UntypedFormGroup;

  formulario: Formulario = new Formulario();
  estructuraa: Estructuraa = new Estructuraa();

  constructor(
    private formularioService: FormularioService,
    private estruraaService: EstructuraaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ) {}

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;

        console.log(formulario);

        if (formulario.idTorres != null) {
          // Aca va el nuevo Formulario
          this.formEstructuraa.patchValue(formulario.idTorres);
        }
      });
  }

  guardarEstructuraa(estructuraa: Estructuraa) {
    this.estructuraa = estructuraa;
    this.estruraaService
      .save(this.estructuraa)
      .subscribe((estructuraa: Estructuraa) => {
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Estructura',
        //   detail: `Se ha guardado correctamente la estructura ${estructuraa.idTorre}`,
        // });
        this.formulario.idTorres = estructuraa;
        this.guardarFormulario();
      });
  }

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
          `resumen/formulario/ver/${formulario.idInspeccion}/cable-conductor/${formulario.idInspeccion}`,
        );
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    this.estructuraa = this.formEstructuraa.value;
    this.guardarEstructuraa(this.estructuraa);
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/apantallamiento/${this.formulario.idInspeccion}`,
    );
  }

  ngOnInit(): void {
    this.formEstructuraa = this.fb.group({
      idTorre: new UntypedFormControl(),
      funcion: new UntypedFormControl(null, Validators.required),
      tipo: new UntypedFormControl(null, Validators.required),
      pintura: new UntypedFormControl(null, Validators.required),
      estadoAngulos: new UntypedFormControl(null, Validators.required),
      riesgoElectrico: new UntypedFormControl(null, Validators.required),
      vial: new UntypedFormControl(null, Validators.required),
      nomenclatura: new UntypedFormControl(null, Validators.required),
      observaciones: new UntypedFormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

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
      { label: 'NO TIENE', value: 'noTiene' },
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
      { label: 'BUEN ESTADO', value: 'buen' },
      { label: 'MAL ESTADO', value: 'mal' },
      { label: 'NO TIENE', value: 'noTiene' },
    ];
    this.vialOpcions = [
      { label: 'SI TIENE', value: 'siTiene' },
      { label: 'NO TIENE', value: 'noTiene' },
      { label: 'NO APLICA', value: 'noAplica' },
    ];
    this.nomenclaturaOpcions = [
      { label: 'BUEN ESTADO', value: 'buen' },
      { label: 'MAL ESTADO', value: 'mal' },
      { label: 'NO TIENE', value: 'noTiene' },
    ];
  }
}
