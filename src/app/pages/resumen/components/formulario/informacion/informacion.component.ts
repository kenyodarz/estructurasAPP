// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  formInformacion: FormGroup;
  stateOptions: { label: string; value: boolean }[];

  constructor(
    private estructuraService: EstructuraService,
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  buscarEstructura() {
    console.log(this.numEstructura);
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
      idEstructura: new FormControl(null, Validators.required),
      numEstructura: new FormControl(null, Validators.required),
      circuito: new FormControl(null, Validators.required),
      ubicacion: new FormControl(null, Validators.required),
      predioPublico: new FormControl(null, Validators.required),
      coordinadaX: new FormControl(null, Validators.required),
      coordinadaY: new FormControl(null, Validators.required),
      alturaSobreNivelMar: new FormControl(null, Validators.required),
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
