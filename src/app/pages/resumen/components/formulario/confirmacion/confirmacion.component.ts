import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  formConfirmacion: UntypedFormGroup;
  formFaseR: UntypedFormGroup;
  formFaseS: UntypedFormGroup;
  formFaseT: UntypedFormGroup;
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
    private fb: UntypedFormBuilder,
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
      idInspeccion: new UntypedFormControl(),
      estructura: new UntypedFormControl(),
      idApantallamiento: new UntypedFormControl(),
      cableGuarda: new UntypedFormControl(),
      tipoApantallamiento: new UntypedFormControl(),
      calibreApantallamiento: new UntypedFormControl(),
      observacionesApantallamiento: new UntypedFormControl(),
      rotos: new UntypedFormControl(),
      noTieneBlin: new UntypedFormControl(),
      empalmeMalEstado: new UntypedFormControl(),
      herrajeMalEstado: new UntypedFormControl(),
      buenos: new UntypedFormControl(),
      idTorres: new UntypedFormControl(),
      funcion: new UntypedFormControl(),
      tipo: new UntypedFormControl(null, Validators.required),
      pintura: new UntypedFormControl(null, Validators.required),
      estadoAngulos: new UntypedFormControl(null, Validators.required),
      riesgoElectrico: new UntypedFormControl(null, Validators.required),
      vial: new UntypedFormControl(null, Validators.required),
      nomenclatura: new UntypedFormControl(null, Validators.required),
      observaciones: new UntypedFormControl(null, Validators.required),
      idCableConductor: new UntypedFormControl(),
      calibreCableConductor: new UntypedFormControl(null, Validators.required),
      amortiguadorCableConductor: new UntypedFormControl(null, Validators.required),
      cantidadAmortiguadores: new UntypedFormControl(),
      observacionesCableConductor: new UntypedFormControl(),
      idAisladores: new UntypedFormControl(),
      idBases: new UntypedFormControl(),
      idSpt: new UntypedFormControl(),
      idServidumbre: new UntypedFormControl(),
      idtransposicion: new UntypedFormControl(),
      idUbicacion: new UntypedFormControl(),
      numeroOT: new UntypedFormControl(),
      persona: new UntypedFormControl(),
      nombre2: new UntypedFormControl(),
      nombre3: new UntypedFormControl(),
      nombre4: new UntypedFormControl(),
      nombre5: new UntypedFormControl(),
      codigo1: new UntypedFormControl(),
      codigo2: new UntypedFormControl(),
      codigo3: new UntypedFormControl(),
      codigo4: new UntypedFormControl(),
      codigo5: new UntypedFormControl(),
      fecha: new UntypedFormControl(),
      movil: new UntypedFormControl(),
      reviso: new UntypedFormControl(),
      codigoRevisor: new UntypedFormControl(),
      firma: new UntypedFormControl(),
      fechaRevisor: new UntypedFormControl(),
    });

    this.formFaseR = this.fb.group({
      cantidadManual: new UntypedFormControl(null, Validators.required),
      cantidadFullTension: new UntypedFormControl(null, Validators.required),
      cantidadBlindaje: new UntypedFormControl(null, Validators.required),
      noAplica: new UntypedFormControl(),
      fase: new UntypedFormControl(),
      tipo: new UntypedFormControl(),
      clase: new UntypedFormControl(),
      buenEstado: new UntypedFormControl(),
      numAisladores: new UntypedFormControl(),
      tipoCadena: new UntypedFormControl(),
      puentes: new UntypedFormControl(),
      observaciones: new UntypedFormControl(),
    });
    this.formFaseS = this.fb.group({
      cantidadManual: new UntypedFormControl(null, Validators.required),
      cantidadFullTension: new UntypedFormControl(null, Validators.required),
      cantidadBlindaje: new UntypedFormControl(null, Validators.required),
      noAplica: new UntypedFormControl(),
      fase: new UntypedFormControl(),
      tipo: new UntypedFormControl(),
      clase: new UntypedFormControl(),
      buenEstado: new UntypedFormControl(),
      numAisladores: new UntypedFormControl(),
      tipoCadena: new UntypedFormControl(),
      puentes: new UntypedFormControl(),
      observaciones: new UntypedFormControl(),
    });
    this.formFaseT = this.fb.group({
      cantidadManual: new UntypedFormControl(null, Validators.required),
      cantidadFullTension: new UntypedFormControl(null, Validators.required),
      cantidadBlindaje: new UntypedFormControl(null, Validators.required),
      noAplica: new UntypedFormControl(),
      fase: new UntypedFormControl(),
      tipo: new UntypedFormControl(),
      clase: new UntypedFormControl(),
      buenEstado: new UntypedFormControl(),
      numAisladores: new UntypedFormControl(),
      tipoCadena: new UntypedFormControl(),
      puentes: new UntypedFormControl(),
      observaciones: new UntypedFormControl(),
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
