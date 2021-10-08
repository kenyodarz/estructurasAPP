import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { ServidumbreService } from 'src/app/core/services/servidumbre.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css'],
})
export class ConfirmacionComponent implements OnInit {
  formConfirmacion: FormGroup;
  formFaseR: FormGroup;
  formFaseS: FormGroup;
  formFaseT: FormGroup;
  stateOptions: any[];
  paymentOptions: any[];
  funcionOptions: any[];
  tipoOpcions: any[];
  pinturaOpcions: any[];
  angulosOpcions: any[];
  riesgoElectricoOpcions: any[];
  vialOpcions: any[];
  nomenclaturaOpcions: any[];
  amortiguadorOpcions: any[];

  tipo: any[];
  tipoCadena: any[];
  puentes: any[];
  clase: any[];

  formulario: Formulario = new Formulario();
  constructor(
    private formularioService: FormularioService,
    private servidumbreService: ServidumbreService,
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
        if (formulario != null) {
          console.log(formulario.idApantallamiento);
          if (formulario.idApantallamiento != null) {
            this.formConfirmacion.patchValue(formulario.idApantallamiento);
            //this.formConfirmacion.patchValue(formulario.idApantallamiento)
            this.formConfirmacion.patchValue(formulario.idTorres);
            this.formConfirmacion.patchValue(formulario.idCableConductor);
            this.cargarDatos(formulario);
            
            console.log(this.formConfirmacion.value);
          }
          // Aca va el nuevo Formulario
          // this.formConfirmacion.patchValue(formulario.estructura);
          // this.cargarDatos(formulario);
        }
      });
  }

  cargarDatos(formulario: Formulario) {
    console.log(formulario);
    this.formulario = formulario;
    this.formConfirmacion.patchValue(formulario);
    formulario.idCableConductor.empalmes.forEach((fase) => {
      switch (fase.fase) {
        case 'R':
          this.formFaseR.patchValue(fase);
          break;

        case 'S':
          this.formFaseS.patchValue(fase);
          break;

        case 'T':
          this.formFaseT.patchValue(fase);
          break;

        default:
          console.warn('No existe la fase del Cable conductor');
          break;
      }
    });
    formulario.idAisladores.fases.forEach((fase) => {
      switch (fase.fase) {
        case 'R':
          this.formFaseR.patchValue(fase);
          break;

        case 'S':
          this.formFaseS.patchValue(fase);
          break;

        case 'T':
          this.formFaseT.patchValue(fase);
          break;

        default:
          console.warn('No existe la fase del aislamiento');
          break;
      }
    });
    // this.fases = aislamiento.fases;
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/observacion/${this.formulario.idInspeccion}`
    );
  }
  nextPage(){
    console.log("ingreso");
     this.confirmationService.confirm({
       message: '¿Está seguro que desea terminar el diligenciamiento de inspeccion por estructura?',
       accept: () => {
          this.formularioService
            .save(this.formulario)
            .subscribe((formulario: Formulario) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Información',
                detail: `La Inspección ${formulario.idInspeccion} ha finalizado correctamente`,
              });
               this.router.navigateByUrl(
                 `resumen/formulario`
               );
             });
       },
     });
  }

  ngOnInit(): void {
    this.formConfirmacion = this.fb.group({
      idInspeccion: new FormControl(),
      estructura: new FormControl(),
      idApantallamiento: new FormControl(),
      cableGuarda: new FormControl(),
      tipoApantallamiento: new FormControl(),
      calibreApantallamiento: new FormControl(),
      observacionesApantallamiento: new FormControl(),
      rotos: new FormControl(),
      noTieneBlin: new FormControl(),
      empalmeMalEstado: new FormControl(),
      herrajeMalEstado: new FormControl(),
      buenos: new FormControl(),
      idTorres: new FormControl(),
      funcion: new FormControl(),
      tipo: new FormControl(null, Validators.required),
      pintura: new FormControl(null, Validators.required),
      estadoAngulos: new FormControl(null, Validators.required),
      riesgoElectrico: new FormControl(null, Validators.required),
      vial: new FormControl(null, Validators.required),
      nomenclatura: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
      idCableConductor: new FormControl(),
      calibreCableConductor: new FormControl(null, Validators.required),
      amortiguadorCableConductor: new FormControl(null, Validators.required),
      cantidadAmortiguadores: new FormControl(),
      observacionesCableConductor: new FormControl(),
      idAisladores: new FormControl(),
      idBases: new FormControl(),
      idSpt: new FormControl(),
      idServidumbre: new FormControl(),
      idtransposicion: new FormControl(),
      idUbicacion: new FormControl(),
      numeroOT: new FormControl(),
      persona: new FormControl(),
      nombre2: new FormControl(),
      nombre3: new FormControl(),
      nombre4: new FormControl(),
      nombre5: new FormControl(),
      codigo1: new FormControl(),
      codigo2: new FormControl(),
      codigo3: new FormControl(),
      codigo4: new FormControl(),
      codigo5: new FormControl(),
      fecha: new FormControl(),
      movil: new FormControl(),
      reviso: new FormControl(),
      codigoRevisor: new FormControl(),
      firma: new FormControl(),
      fechaRevisor: new FormControl(),
    });

    this.formFaseR = this.fb.group({
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
      fase: new FormControl(),
      tipo: new FormControl(),
      clase: new FormControl(),
      buenEstado: new FormControl(),
      numAisladores: new FormControl(),
      tipoCadena: new FormControl(),
      puentes: new FormControl(),
      observaciones: new FormControl(),
    });
    this.formFaseS = this.fb.group({
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
      fase: new FormControl(),
      tipo: new FormControl(),
      clase: new FormControl(),
      buenEstado: new FormControl(),
      numAisladores: new FormControl(),
      tipoCadena: new FormControl(),
      puentes: new FormControl(),
      observaciones: new FormControl(),
    });
    this.formFaseT = this.fb.group({
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
      fase: new FormControl(),
      tipo: new FormControl(),
      clase: new FormControl(),
      buenEstado: new FormControl(),
      numAisladores: new FormControl(),
      tipoCadena: new FormControl(),
      puentes: new FormControl(),
      observaciones: new FormControl(),
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
      { label: 'NO TIENE', value: 'no' },
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
    this.amortiguadorOpcions = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];
      this.tipo = [
        { label: 'POLIMÉRICO', value: 'polimerico' },
        { label: 'PORCELANA', value: 'porcelana' },
        { label: 'VIDRIO', value: 'vidrio' },
        { label: 'LINE POST', value: 'line' },
      ];

      this.clase = [
        { label: 'CUENCA', value: 'cuenca' },
        { label: 'CLEVIS', value: 'clevis' },
      ];

      this.tipoCadena = [
        { label: 'SENCILLA', value: 'sencilla' },
        { label: 'DOBLE', value: 'doble' },
      ];

      this.puentes = [
        { label: 'CONTINUO', value: 'continuo' },
        { label: 'ENTIZADO', value: 'entizado' },
        { label: 'BLINDAJE', value: 'blindaje' },
        { label: 'CONECTOR BIMETALICO', value: 'bimetalico' },
        { label: 'CONECTOR COMPRESIÓN', value: 'compresion' },
      ];
  }
}
