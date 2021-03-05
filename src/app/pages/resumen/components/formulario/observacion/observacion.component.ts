import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css'],
})
export class ObservacionComponent implements OnInit {
  formulario: Formulario = new Formulario();
  formObservacion: FormGroup;
  constructor(
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.idInspeccion != null) {
          // Aca va el nuevo Formulario
         //  this.formObservacion.patchValue(formulario.estructura);
        }
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    // this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/confirmacion/${this.formulario.idInspeccion}`
    );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/ubicacion/${this.formulario.idInspeccion}`
    );
  }
  ngOnInit(): void {
    this.formObservacion = this.fb.group({
      observaciones: new FormControl(null, Validators.required),
      nombre2: new FormControl(null, Validators.required),
      nombre3: new FormControl(null, Validators.required),
      nombre4: new FormControl(null, Validators.required),
      nombre5: new FormControl(null, Validators.required),
      codigo2: new FormControl(null, Validators.required),
      codigo3: new FormControl(null, Validators.required),
      codigo4: new FormControl(null, Validators.required),
      codigo5: new FormControl(null, Validators.required),
      fecha: new FormControl(),
      movil: new FormControl(),
      reviso: new FormControl(null, Validators.required),
      codigoRevisor: new FormControl(null, Validators.required),
      firma: new FormControl(null, Validators.required),
      fechaRevisor: new FormControl(),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
}
