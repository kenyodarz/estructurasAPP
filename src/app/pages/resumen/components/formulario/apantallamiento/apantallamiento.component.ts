// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
// Services
import { ApantallamientoService } from 'src/app/core/services/apantallamiento.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
// Modelos
import { Formulario } from 'src/app/core/models/formulario';
import { Estructura } from 'src/app/core/models/estructura';
import { Apantallamiento } from 'src/app/core/models/apantallamiento';

@Component({
  selector: 'app-apantallamiento',
  templateUrl: './apantallamiento.component.html',
  styleUrls: ['./apantallamiento.component.css'],
})
export class ApantallamientoComponent implements OnInit {
  stateOptions: any[];
  paymentOptions: any[];
  estructura: Estructura = new Estructura();
  formulario: Formulario = new Formulario();
  formApantallamiento: FormGroup;
  constructor(
    private apantallaminetoService: ApantallamientoService,
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.stateOptions = [
      { label: 'SI', value: 'true' },
      { label: 'NO', value: 'false' },
    ];

    this.paymentOptions = [
      { label: 'HHS', value: 'true' },
      { label: 'OPGW', value: 'false' },
    ];
  }

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.idApantallamiento != null) {
          // Aca va el nuevo Formulario
           this.formApantallamiento.patchValue(formulario.idApantallamiento);
        }
      });
  }

  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'apantallamiento',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/estructuraa/${formulario.idInspeccion}`
        );
      });
  }
  onSubmit() {}
  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
   this.formulario.idApantallamiento = this.formApantallamiento.value as Apantallamiento;
    this.guardarFormulario();
  }
  prevPage() {}

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
}
