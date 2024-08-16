// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
// Services
import { ApantallamientoService } from 'src/app/core/services/apantallamiento.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
// Modelos
import { Formulario } from 'src/app/core/models/formulario';
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
  apantallamiento: Apantallamiento = new Apantallamiento();
  formulario: Formulario = new Formulario();
  estado: Estado = new Estado();
  conector: Conector = new Conector();

  formApantallamiento: UntypedFormGroup;
  formEstado: UntypedFormGroup;
  formConector: UntypedFormGroup;

  stateOptions: any[];
  paymentOptions: any[];
  constructor(
    private apantallaminetoService: ApantallamientoService,
    private estadoService: EstadoService,
    private conectorService: ConectorService,
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.idApantallamiento != null) {
          // Aca va el nuevo Formulario
          this.cargarDatos(formulario.idApantallamiento);
          //  this.obtenerEstado(formulario.idApantallamiento.idApantallamiento);
        }
      });
  }

  obtenerEstado(idApantallamiento: string) {
    this.estadoService
      .obtenerEstadoPorApantallamiento(idApantallamiento)
      .subscribe((estado: Estado) => {
        console.info(estado);
        this.formEstado.patchValue(estado);
        this.estado = estado;
      });
  }

  obtenerConector(idApantallamiento: string) {
    this.conectorService
      .obtenerConectorPorApantallamiento(idApantallamiento)
      .subscribe((conector: Conector) => {
        console.info(conector);
        this.formConector.patchValue(conector);
        this.conector = conector;
      });
  }

  guardarApantallamento() {
    this.apantallaminetoService
      .save(this.apantallamiento)
      .subscribe((apantallamiento: Apantallamiento) => {
        this.guardarEstado(apantallamiento);
        this.guardarConector(apantallamiento);
        this.formulario.idApantallamiento = apantallamiento;
        this.guardarFormulario();
      });
  }

  guardarConector(apantallamiento: Apantallamiento) {
    this.conector.apantallamiento = apantallamiento;
    this.conectorService.save(this.conector).subscribe((conector: Conector) =>
      this.messageService.add({
        severity: 'info',
        summary: 'Conector',
        detail: `Se ha guardado correctamente el Conector ${conector.idConector}`,
      })
    );
  }

  guardarEstado(apantallamiento: Apantallamiento) {
    this.estado.apantallamiento = apantallamiento;
    this.estadoService.save(this.estado).subscribe((estado: Estado) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Estado',
        detail: `Se ha guardado correctamente el Estado ${estado.idEstado}`,
      });
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

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    this.conector = this.formConector.value;
    this.estado = this.formEstado.value;
    this.apantallamiento = this.formApantallamiento.value;
    this.guardarApantallamento();
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/informacion/${this.formulario.idInspeccion}`
    );
  }

  OnChangeMalEstado() {
    this.buenEstado = false;
  }

  OnChangeBuenEstado() {
    this.malEstado = false;
    this.blindaje = false;
    this.empalme = false;
    this.herraje = false;
  }

  OnChangeConectorMal() {
    this.buenos = false;
  }

  OnChangeConectorBuenEstado() {
    this.sulfatados = false;
    this.quemados = false;
    this.reposicion = false;
  }

  cargarDatos(apantallamiento: Apantallamiento) {
    this.formApantallamiento.patchValue(apantallamiento);
    this.obtenerEstado(apantallamiento.idApantallamiento);
    this.obtenerConector(apantallamiento.idApantallamiento);
  }

  ngOnInit(): void {
    this.formApantallamiento = this.fb.group({
      idApantallamiento: new UntypedFormControl(),
      cableGuarda: new UntypedFormControl(null, Validators.required),
      tipoApantallamiento: new UntypedFormControl(null, Validators.required),
      calibreApantallamiento: new UntypedFormControl(null, Validators.required),
      observacionesApantallamiento: new UntypedFormControl(null, Validators.required),
    });
    this.formConector = this.fb.group({
      sulfatados: new UntypedFormControl(),
      quemados: new UntypedFormControl(),
      reposicion: new UntypedFormControl(),
      buenos: new UntypedFormControl(),
      idConector: new UntypedFormControl(),
    });
    this.formEstado = this.fb.group({
      rotos: new UntypedFormControl(),
      noTieneBlin: new UntypedFormControl(),
      empalmeMalEstado: new UntypedFormControl(),
      herrajeMalEstado: new UntypedFormControl(),
      buenos: new UntypedFormControl(),
      idEstado: new UntypedFormControl(),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.stateOptions = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];

    this.paymentOptions = [
      { label: 'HHS', value: 'HHS' },
      { label: 'OPGW', value: 'OPGW' },
    ];
  }
  get malEstado() {
    return this.formEstado.get('rotos').value;
  }

  set malEstado(estado: boolean) {
    this.formEstado.patchValue({
      rotos: estado,
    });
  }
  get blindaje() {
    return this.formEstado.get('noTieneBlin').value;
  }

  set blindaje(estado: boolean) {
    this.formEstado.patchValue({
      noTieneBlin: estado,
    });
  }
  get empalme() {
    return this.formEstado.get('empalmeMalEstado').value;
  }

  set empalme(estado: boolean) {
    this.formEstado.patchValue({
      empalmeMalEstado: estado,
    });
  }

  get herraje() {
    return this.formEstado.get('herrajeMalEstado').value;
  }

  set herraje(estado: boolean) {
    this.formEstado.patchValue({
      herrajeMalEstado: estado,
    });
  }

  get sulfatados() {
    return this.formConector.get('sulfatados').value;
  }

  set sulfatados(estado: boolean) {
    this.formConector.patchValue({
      sulfatados: estado,
    });
  }

  get quemados() {
    return this.formConector.get('quemados').value;
  }

  set quemados(estado: boolean) {
    this.formConector.patchValue({
      quemados: estado,
    });
  }

  get reposicion() {
    return this.formConector.get('reposicion').value;
  }

  set reposicion(estado: boolean) {
    this.formConector.patchValue({
      reposicion: estado,
    });
  }

  get buenos() {
    return this.formConector.get('buenos').value;
  }

  set buenos(estado: boolean) {
    this.formConector.patchValue({
      buenos: estado,
    });
  }

  get buenEstado() {
    return this.formEstado.get('buenos').value;
  }

  set buenEstado(estado: boolean) {
    this.formEstado.patchValue({
      buenos: estado,
    });
  }
}
