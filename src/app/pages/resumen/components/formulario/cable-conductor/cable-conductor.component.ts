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
import { DeshilachadoService } from 'src/app/core/services/deshilachado.service';
import { flushMicrotasks } from '@angular/core/testing';

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
  deshilachado: Deshilachado = new Deshilachado();

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
  checked2: boolean = true;

  mostrar: boolean = false;
  mostrarFaseR: boolean = false;
  mostrarFaseS: boolean = false;
  mostrarFaseT: boolean = false;
  constructor(
    private cableConductorService: cableConductorService,
    private formularioService: FormularioService,
    private empalmeService: EmpalmeService,
    private deshilachadoService: DeshilachadoService,
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

      if(formulario.idCableConductor.empalmes.length >0 ){
        
        this.mostrar = true;
      }
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
    console.log(cableConductor);
    this.cableConductor = cableConductor;
    this.formCableConductor.patchValue(cableConductor);
    cableConductor.empalmes.forEach((empalme) => {
      switch (empalme.fase) {
        case 'R':
          this.formFaseR.patchValue(empalme);
          break;
        case 'S':
          this.formFaseS.patchValue(empalme);
          break;
        case 'T':
          this.formFaseT.patchValue(empalme);
          break;

        default:
          console.warn('No existe la fase del empalme');
          break;
      }
    });
    this.empalmes = cableConductor.empalmes;
    this.deshilachados = cableConductor.deshilachado;
         
  }

  guardarCableConductor() {
    console.log(this.cableConductor);
    this.cableConductorService
      .save(this.cableConductor)
      .subscribe((cableConductor: CableConductor) => {
        this.formulario.idCableConductor = cableConductor;
        this.obtenerFormulario(this.formulario.idInspeccion);
        this.guardarFormulario();
      });
  }

  guardarEmpalme(empalme: Empalme) {
    this.empalmeService
      .guardarEmpalmeConCConductor(
        this.formulario.idCableConductor.idCableConductor,
        empalme
      )
      .subscribe((empalmeResul: Empalme) => {
        this.cableConductorService
          .asignarEmpalme(
            this.formulario.idCableConductor.idCableConductor,
            empalmeResul
          )
          .subscribe((data) => {
            this.obtenerFormulario(this.formulario.idInspeccion);
          });
        this.messageService.add({
          severity: 'info',
          summary: 'Empalme',
          detail: `Se ha guardado correctamente el Empalme ${empalmeResul.idEmpalme}`,
        });
      });
  }

  guardarDeshilachados(deshilachado: Deshilachado) {
    this.deshilachadoService
      .guardarDeshilachadoConConductor(
        this.formulario.idCableConductor.idCableConductor,
        deshilachado
      )
      .subscribe((deshilachadoResul: Deshilachado) => {
        this.cableConductorService
          .asignarDeshilachado(
            this.formulario.idCableConductor.idCableConductor,
            deshilachadoResul
          )
          .subscribe((data) => {
            this.obtenerFormulario(this.formulario.idInspeccion);
          });
        this.messageService.add({
          severity: 'info',
          summary: 'Deshilachado',
          detail: `Se ha guardado correctamente el Deshilachado ${deshilachadoResul.idDeshilachado}`,
        });
      });
  }

  guardarDeshilachadoR() {
    let deshilachado: Deshilachado = this.formDeshilachado.value;
    deshilachado.fase = 'R';
    this.guardarDeshilachados(deshilachado);
  }

  guardarDeshilachadoS() {
    let deshilachado: Deshilachado = this.formDeshilachado.value;
    deshilachado.fase = 'S';
    this.guardarDeshilachados(deshilachado);
  }

  guardarDeshilachadoT() {
    let deshilachado: Deshilachado = this.formDeshilachado.value;
    deshilachado.fase = 'T';
    this.guardarDeshilachados(deshilachado);
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

  next() {
    if (
      this.cableConductor !== null &&
      this.cableConductor.idCableConductor !== null
    ) {
      console.log('Entro en el SI');
      this.cableConductor;
      // Codigo en caso de que si
    } else {
      console.log('Entro en el NO');
      // Codigo caso no
      this.cableConductor = this.formCableConductor.value;
      this.cableConductorService
        .save(this.cableConductor)
        .subscribe((cableConductor: CableConductor) => {
          this.formulario.idCableConductor = cableConductor;
          this.formularioService
            .save(this.formulario)
            .subscribe((formulario: Formulario) => {
              this.messageService.add({
                severity: 'info',
                summary: 'CableConductor',
                detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
              });
            });
        });
    }
  }

  nextPage() {
    this.cableConductor = new CableConductor();
    console.log(this.formCableConductor.value);
    this.cableConductor = this.formCableConductor.value;
    if (
      (this.cableConductor.buenEstadoConductor == true ||
        this.cableConductor.embarrilado == true) &&
      this.deshilacha == false
    ) {
      console.log('entro 1');
       this.cableConductor = this.formCableConductor.value;
       this.empalme = this.formEmpalme.value;
       this.guardarCableConductor();

    } else if (
      this.cableConductor.buenEstadoConductor == false &&
      this.cableConductor.embarrilado == false &&
      this.deshilacha == true
    ) {
      console.log('entro 2');
          this.cableConductor = this.formCableConductor.value;
          this.empalme = this.formEmpalme.value;
          this.deshilachado = this.formDeshilachado.value;
          let deshilacha: Deshilachado = this.formDeshilachado.value;
          // this.guardarDeshilachados(deshilacha);
          this.guardarCableConductor();

    }
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/estructuraa/${this.formulario.idInspeccion}`
    );
  }

  OnChangeBuenEstado() {
    this.embarrilado = false;
    this.deshilacha = false;
  }

  OnChangeEmbarrilado() {
    this.buenEstado = false;
    this.deshilacha = false;
  }

  OnChangeDeshilachado() {
    this.buenEstado = false;
    this.embarrilado = false;
  }

  guardarEmpalmeR() {
    let empalme: Empalme = this.formFaseR.value;
    empalme.fase = 'R';
    this.guardarEmpalme(empalme);
  }
  guardarEmpalmeS() {
    let empalme: Empalme = this.formFaseS.value;
    empalme.fase = 'S';
    this.guardarEmpalme(empalme);
  }
  guardarEmpalmeT() {
    let empalme: Empalme = this.formFaseT.value;
    empalme.fase = 'T';
    this.guardarEmpalme(empalme);
  }

  ngOnInit(): void {
    this.formCableConductor = this.fb.group({
      idCableConductor: new FormControl(),
      calibreCableConductor: new FormControl(null, Validators.required),
      amortiguadorCableConductor: new FormControl(null, Validators.required),
      cantidadAmortiguadores: new FormControl(),
      buenEstadoConductor: new FormControl(),
      embarrilado: new FormControl(),
      deshilachado: new FormControl(),
      faseEmbarrilado: new FormControl(),
      cantidadEmbarrilado: new FormControl(),
      observacionesCableConductor: new FormControl(null, Validators.required),
      // boton: new FormControl(),
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
      fase: new FormControl(),
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
    });
    this.formFaseT = this.fb.group({
      idEmpalme: new FormControl(),
      fase: new FormControl(),
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

  set buenEstado(estado: boolean) {
    this.formCableConductor.patchValue({
      buenEstadoConductor: estado,
    });
  }

  get embarrilado() {
    return this.formCableConductor.get('embarrilado').value;
  }

  set embarrilado(estado: boolean) {
    this.formCableConductor.patchValue({
      embarrilado: estado,
    });
  }

  get deshilacha() {
    return this.formCableConductor.get('deshilachado').value;
  }

  set deshilacha(estado: boolean) {
    this.formCableConductor.patchValue({
      deshilachado: estado,
    });
  }

  get amortiguadorCableConductor() {
    return this.formCableConductor.get('amortiguadorCableConductor').value;
  }
  set cantidadAmortiguadores(cantidad: number) {
    this.formCableConductor.patchValue({
      cantidadAmortiguadores: cantidad,
    });
  }
  get cantidadAmortiguadores() {
    return this.formCableConductor.get('cantidadAmortiguadores').value;
  }

  get ApareceEmpalmes() {
    return this.formCableConductor.get('boton').value;
  }
  get ApareceDeshilachado() {
    return this.formCableConductor.get('boton').value;
  }

  amortiguadorOnChange() {
    console.log('cambio');
    if (this.amortiguadorCableConductor === false) {
      this.cantidadAmortiguadores = 0;
    }
  }
}
