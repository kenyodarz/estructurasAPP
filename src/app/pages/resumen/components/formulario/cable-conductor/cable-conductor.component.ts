import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CableConductor } from 'src/app/core/models/cableConductor';
import { Empalme } from 'src/app/core/models/empalme';
import { Formulario } from 'src/app/core/models/formulario';
import { cableConductorService } from 'src/app/core/services/cableConductor.service';
import { EmpalmeService } from 'src/app/core/services/empalme.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { Deshilachado } from 'src/app/core/models/deshilachado';

@Component({
  selector: 'app-cable-conductor',
  templateUrl: './cable-conductor.component.html',
  styleUrls: ['./cable-conductor.component.css'],
})
export class CableConductorComponent implements OnInit {
  cableConductor: CableConductor = new CableConductor();
  formulario: Formulario = new Formulario();
  empalme: Empalme = new Empalme();
  empalmes: Empalme[] = [];
  deshilachados: Deshilachado[] = [];

  formCableConductor: FormGroup;
  formEmpalme: FormGroup;
  formDeshilachado: FormGroup;
  formFaseR: FormGroup;
  formFaseS: FormGroup;
  formFaseT: FormGroup;

  amortiguadorOpcions: any[];
  products: any[];
  selectedProducts: any[];
  checked: string = 'No aplica';
  mostrarFaseR: boolean = false;
  mostrarFaseS: boolean = false;
  mostrarFaseT: boolean = false;
  constructor(
    private cableConductorService: cableConductorService,
    private formularioService: FormularioService,
    private empalmeService: EmpalmeService,
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
        if (formulario.idCableConductor != null) {
          this.cargarDatos(formulario.idCableConductor);
          //this.formCableConductor.patchValue(formulario.idCableConductor);
        }
        //   console.log(this.formulario);
      });
  }

  obtenerEmpalme(idCableConductor: string) {
    this.empalmeService
      .obtenerEmpalmePorCableConductor(idCableConductor)
      .subscribe((empalme: Empalme) => {
        console.info(empalme);
        this.formEmpalme.patchValue(empalme);
        this.empalme = empalme;
      });
  }

  cargarDatos(cableConductor: CableConductor) {
    this.formCableConductor.patchValue(cableConductor);
    this.empalmes = cableConductor.empalmes;
    this.deshilachados = cableConductor.deshilachado;
  }

  guardarCableConductor() {
    this.cableConductorService
      .save(this.cableConductor)
      .subscribe((cableConductor: CableConductor) => {
        this.formulario.idCableConductor = cableConductor;
        this.guardarFormulario();
      });
  }

  guardarEmpalme(empalme: Empalme) {
    this.empalmeService
      .guardarEmpalmeConCConductor(
        this.formulario.idCableConductor.idCableConductor,
        empalme
      )
      .subscribe((empalme: Empalme) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Empalme',
          detail: `Se ha guardado correctamente el Empalme ${empalme.idEmpalme}`,
        });
      });
  }

  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'CableConductor',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/aislamiento/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    this.cableConductor = this.formCableConductor.value;
    this.empalme = this.formEmpalme.value;
    this.cableConductor = this.formCableConductor.value;
    this.guardarCableConductor();
    // this.router.navigateByUrl(
    //   `resumen/formulario/ver/${this.formulario.idInspeccion}/aislamiento/${this.formulario.idInspeccion}`
    // );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/estructuraa/${this.formulario.idInspeccion}`
    );
  }

  OnChangeBuenEstado() {
    this.embarrilado = false;
  }

  guardarEmpalmeR() {
    let empalme: Empalme = this.formFaseR.value;
    empalme.fase = 'R';
    this.guardarEmpalme(empalme);
  }

  ngOnInit(): void {
    this.formCableConductor = this.fb.group({
      idCableConductor: new FormControl(),
      calibreCableConductor: new FormControl(null, Validators.required),
      amortiguadorCableConductor: new FormControl(null, Validators.required),
      cantidadAmortiguadores: new FormControl(),
      buenEstadoConductor: new FormControl(null, Validators.required),
      embarrilado: new FormControl(),
      deshilachado: new FormControl(),
      faseEmbarrilado: new FormControl(),
      cantidadEmbarrilado: new FormControl(),
      observacionesCableConductor: new FormControl(),
    });
    this.formEmpalme = this.fb.group({
      idEmpalme: new FormControl(),
      fase: new FormControl(null, Validators.required),
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
    });
    this.formFaseR = this.fb.group({
      idEmpalme: new FormControl(),
      fase: new FormControl(),
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
    });
    this.formFaseS = this.fb.group({
      idEmpalme: new FormControl(),
      fase: new FormControl(null, Validators.required),
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
    });
    this.formFaseT = this.fb.group({
      idEmpalme: new FormControl(),
      fase: new FormControl(null, Validators.required),
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
    });
    this.formDeshilachado = this.fb.group({
      idDeshilachado: new FormControl(),
      fase: new FormControl(null, Validators.required),
      numeroHilos: new FormControl(null, Validators.required),
      distancia: new FormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.amortiguadorOpcions = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];
  }

  get buenEstado() {
    return this.formCableConductor.get('buenEstadoConductor').value;
  }

  get embarrilado() {
    return this.formCableConductor.get('embarrilado').value;
  }

  set embarrilado(estado: boolean) {
    this.formCableConductor.patchValue({
      embarrilado: estado,
    });
  }

  get amortiguadorCableConductor() {
    return this.formCableConductor.get('amortiguadorCableConductor').value;
  }
}
