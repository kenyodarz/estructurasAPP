import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { Persona } from 'src/app/core/models/persona';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css'],
})
export class ObservacionComponent implements OnInit {
  formulario: Formulario = new Formulario();
  persona: Persona = new Persona();
  formObservacion: UntypedFormGroup;
  formPersona: UntypedFormGroup;
  constructor(
    private formularioService: FormularioService,
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
        if (formulario != null) {
          if (formulario.persona != null) {
            this.formObservacion.patchValue(formulario.persona);
            this.formObservacion.patchValue(formulario);
            this.formPersona.patchValue(formulario);
          }
        }
        // this.formulario.observaciones =
      });
  }

  // cargarDatos(formulario: Formulario) {
  //   console.log(formulario);
  //   this.formulario = formulario;
  //   this.formObservacion.patchValue(formulario);
  //   formulario.persona.forEach(persona => {
  //     this.formObservacion.patchValue(persona);
  //     console.log(this.formObservacion);
  //   });
  // }

  // guardarFormulario() {
  //   this.formularioService
  //     .save(this.formulario)
  //     .subscribe((formulario: Formulario) => {
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Información',
  //         detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
  //       });
  //       this.router.navigateByUrl(
  //         `resumen/formulario/ver/${formulario.idInspeccion}/confirmacion/${formulario.idInspeccion}`
  //       );
  //     });
  // }

  guardarObservacion() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Observacion',
          detail: `Se ha guardado correctamente la observacion ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/confirmacion/${formulario.idInspeccion}`,
        );
      });
  }
  nextPage() {
    //this.formulario = this.formObservacion.value;
    this.formulario.observaciones =
      this.formObservacion.get('observaciones').value;
    this.formulario.nombre2 = this.formObservacion.get('nombre2').value;
    this.formulario.codigo2 = this.formObservacion.get('codigo2').value;
    this.formulario.nombre3 = this.formObservacion.get('nombre3').value;
    this.formulario.codigo3 = this.formObservacion.get('codigo3').value;
    this.formulario.nombre4 = this.formObservacion.get('nombre4').value;
    this.formulario.codigo4 = this.formObservacion.get('codigo4').value;
    this.formulario.nombre5 = this.formObservacion.get('nombre5').value;
    this.formulario.codigo5 = this.formObservacion.get('codigo5').value;
    // this.formulario.fecha = this.formObservacion.get('fecha').value;
    this.formulario.movil = this.formObservacion.get('movil').value;
    this.formulario.reviso = this.formObservacion.get('reviso').value;
    this.formulario.codigoRevisor =
      this.formObservacion.get('codigoRevisor').value;
    this.formulario.firma = this.formObservacion.get('firma').value;
    // this.formulario.fechaRevisor = this.formObservacion.get('fechaRevisor').value;

    console.log(this.formulario);
    this.guardarObservacion();
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/ubicacion/${this.formulario.idInspeccion}`,
    );
  }

  ngOnInit(): void {
    this.formObservacion = this.fb.group({
      observaciones: new UntypedFormControl(null, Validators.required),
      nombre2: new UntypedFormControl(null, Validators.required),
      nombre3: new UntypedFormControl(null, Validators.required),
      nombre4: new UntypedFormControl(null, Validators.required),
      nombre5: new UntypedFormControl(null, Validators.required),
      codigo2: new UntypedFormControl(null, Validators.required),
      codigo3: new UntypedFormControl(null, Validators.required),
      codigo4: new UntypedFormControl(null, Validators.required),
      codigo5: new UntypedFormControl(null, Validators.required),
      fecha: new UntypedFormControl(),
      movil: new UntypedFormControl(),
      reviso: new UntypedFormControl(null, Validators.required),
      codigoRevisor: new UntypedFormControl(null, Validators.required),
      firma: new UntypedFormControl(),
      fechaRevisor: new UntypedFormControl(),
      nombrePersona: new UntypedFormControl(null, Validators.required),
      cedulaPersona: new UntypedFormControl(null, Validators.required),
    });
    this.formPersona = this.fb.group({
      nombrePersona: new UntypedFormControl(null, Validators.required),
      apellidoPersona: new UntypedFormControl(null, Validators.required),
      cedulaPersona: new UntypedFormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
  get observaciones() {
    return this.formObservacion.get('observaciones').value;
  }
  get nombre2() {
    return this.formObservacion.get('nombre2').value;
  }
}
