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
import { EstadoService } from 'src/app/core/services/estado.service';
import { Estado } from 'src/app/core/models/estado';
import { ConectorService } from 'src/app/core/services/conector.service';
import { Conector } from 'src/app/core/models/conector';

@Component({
  selector: 'app-apantallamiento',
  templateUrl: './apantallamiento.component.html',
  styleUrls: ['./apantallamiento.component.css'],
})
export class ApantallamientoComponent implements OnInit {
  stateOptions: any[];
  paymentOptions: any[];
  formulario: Formulario = new Formulario();
  estado: Estado = new Estado();
  conector: Conector = new Conector();
  formApantallamiento: FormGroup;
  formEstado: FormGroup;
  formConector: FormGroup;
  constructor(
    private apantallaminetoService: ApantallamientoService,
    private estadoService: EstadoService,
    private conectorService: ConectorService,
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
          //  this.obtenerEstado(formulario.idApantallamiento.idApantallamiento);
        }
      });
  }

  obtenerEstado(idApantallamiento: string) {
    this.estadoService
      .obtenerEstadoPorApantallamiento(idApantallamiento)
      .subscribe((estado: Estado) => {
        this.estado = estado;
        console.log(this.estado);
      });
  }

  obtenerConector(idApantallamiento: string) {
    this.conectorService
      .obtenerConectorPorApantallamiento(idApantallamiento)
      .subscribe((conector: Conector) => {
        this.conector = conector;
        console.log(this.conector);
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
    // this.formulario.idApantallamiento = this.formApantallamiento
    //    .value as Apantallamiento;
    this.guardarFormulario();
  }
  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/informacion/${this.formulario.idInspeccion}`
    );
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
    this.formApantallamiento = this.fb.group({
      idApantallamiento: new FormControl(),
      cableGuarda: new FormControl(null, Validators.required),
      tipoApantallamiento: new FormControl(null, Validators.required),
      calibreApantallamiento: new FormControl(null, Validators.required),
      observacionesApantallamiento: new FormControl(null, Validators.required),
    });
    this.formConector = this.fb.group({
      sulfatados: new FormControl(),
      quemados: new FormControl(),
      reposicion: new FormControl(),
      buenos: new FormControl(),
    });
    this.formEstado = this.fb.group({
      rotos: new FormControl(),
      noTieneBlin: new FormControl(),
      empalmeMalEstado: new FormControl(),
      herrajeMalEstado: new FormControl(),
      buenos: new FormControl(),
    });
  }
}
