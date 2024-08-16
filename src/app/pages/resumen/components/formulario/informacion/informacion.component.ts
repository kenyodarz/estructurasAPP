// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
// Services
import { EstructuraService } from 'src/app/core/services/estructura.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
// Modelos
import { Estructura } from 'src/app/core/models/estructura';
import { Formulario } from 'src/app/core/models/formulario';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {
  estructura: Estructura = new Estructura();
  formulario: Formulario = new Formulario();
  formInformacion: UntypedFormGroup;
  stateOptions: { label: string; value: boolean }[];

  constructor(
    private estructuraService: EstructuraService,
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  buscarEstructura() {
    this.estructuraService
      .buscarTorresPorNumero(this.numEstructura, this.circuito)
      .subscribe((estructura: Estructura) => {
        this.formInformacion.patchValue(estructura);
      });
  }

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.estructura != null) {
          this.formInformacion.patchValue(formulario.estructura);
        }
        console.log(this.formulario);
      });
  }

  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Información',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/apantallamiento/${formulario.idInspeccion}`
        );
      });
  }

  onSubmit() {}

  get numEstructura() {
    return this.formInformacion.get('numEstructura').value;
  }
  get circuito() {
    return this.formInformacion.get('circuito').value;
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
    this.formInformacion = this.fb.group({
      idEstructura: new UntypedFormControl(null, Validators.required),
      numEstructura: new UntypedFormControl(null, Validators.required),
      circuito: new UntypedFormControl(null, Validators.required),
      ubicacion: new UntypedFormControl(null, Validators.required),
      predioPublico: new UntypedFormControl(null, Validators.required),
      coordinadaX: new UntypedFormControl(null, Validators.required),
      coordinadaY: new UntypedFormControl(null, Validators.required),
      alturaSobreNivelMar: new UntypedFormControl(null, Validators.required),
    });
    this.stateOptions = [
      { label: 'Publico', value: true },
      { label: 'Privado', value: false },
    ];
  }
  nextPage() {
    this.formulario.estructura = this.formInformacion.value as Estructura;
    this.guardarFormulario();
  }
}
