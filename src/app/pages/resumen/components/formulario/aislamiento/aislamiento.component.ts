import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormularioService } from 'src/app/core/services/formulario.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AislamientoService } from 'src/app/core/services/aislamiento.service';
import { Aislamiento } from 'src/app/core/models/aislamiento';
import { Fase } from 'src/app/core/models/fase';
import { FaseService } from 'src/app/core/services/fase.service';

@Component({
  selector: 'app-aislamiento',
  templateUrl: './aislamiento.component.html',
  styleUrls: ['./aislamiento.component.css'],
})
export class AislamientoComponent implements OnInit {
  aislamiento: Aislamiento = new Aislamiento();
  fase: Fase = new Fase();
  fases: Fase[] = [];
  formulario: Formulario = new Formulario();
  formAislamiento: UntypedFormGroup;
  formFaseR: UntypedFormGroup;
  formFaseS: UntypedFormGroup;
  formFaseT: UntypedFormGroup;

  tipo: any[];
  tipoCadena: any[];
  puentes: any[];
  clase: any[];
  cols: any[];

  filas = [];
  columnas = [];

  mostrar: boolean = false;
  columns: number[];
  constructor(
    private formularioService: FormularioService,
    private aislamientoService: AislamientoService,
    private faseService: FaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private rutaActiva: ActivatedRoute,
  ) {}

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.idAisladores != null) {
          console.log(formulario.idAisladores);
          this.mostrar = true;

          // Aca va el nuevo Formulario
          this.formAislamiento.patchValue(formulario.idAisladores);

          this.cargarDatos(formulario.idAisladores);
        }
      });
  }

  cargarDatos(aislamiento: Aislamiento) {
    console.log(aislamiento);
    this.aislamiento = aislamiento;
    this.formAislamiento.patchValue(aislamiento);
    aislamiento.fases.forEach((fase) => {
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
    this.fases = aislamiento.fases;
  }

  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Aislamiento',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/bases/${formulario.idInspeccion}`,
        );
      });
  }

  guardarAislamiento(aislamiento: Aislamiento) {
    this.aislamiento = aislamiento;
    this.aislamientoService
      .save(this.aislamiento)
      .subscribe((aislamiento: Aislamiento) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Aislamiento',
          detail: `Se ha guardado correctamente el aislamiento ${aislamiento.idAislamiento}`,
        });
        this.formulario.idAisladores = aislamiento;
        this.guardarFormulario();
      });
  }

  next() {
    // this.aislamiento = this.formAislamientoR.value;
    // console.log(this.aislamiento = this.formAislamientoR.value);
    // this.guardarAislamiento(this.aislamiento);

    this.aislamiento = this.formAislamiento.value;
    this.aislamiento.fase = 'Fase';
    console.log((this.aislamiento = this.formAislamiento.value));
    console.log((this.aislamiento.fase = 'Fase'));
    this.aislamientoService
      .save(this.aislamiento)
      .subscribe((aislamiento: Aislamiento) => {
        this.formulario.idAisladores = aislamiento;
        this.formularioService
          .save(this.formulario)
          .subscribe((formulario: Formulario) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Aislamiento',
              detail: `se ha actualizado el aislamiento ${formulario.idAisladores}`,
            });
          });
      });
  }
  guardarFase(fase: Fase) {
    this.faseService
      .guardarFaseconAislamiento(
        this.formulario.idAisladores.idAislamiento,
        fase,
      )
      .subscribe((faseResul: Fase) => {
        this.aislamientoService
          .asignarFases(this.formulario.idAisladores.idAislamiento, faseResul)
          .subscribe((data) => {
            this.obtenerFormulario(this.formulario.idInspeccion);
          });
        this.messageService.add({
          severity: 'info',
          summary: 'Fase',
          detail: `Se ha guardado correctamente la fase ${faseResul.idFase}`,
        });
      });
  }
  guardarFaseR() {
    let fase: Fase = this.formFaseR.value;
    fase.fase = 'R';
    this.guardarFase(fase);
  }
  guardarFaseS() {
    let fase: Fase = this.formFaseS.value;
    fase.fase = 'S';
    this.guardarFase(fase);
  }
  guardarFaseT() {
    let fase: Fase = this.formFaseT.value;
    fase.fase = 'T';
    this.guardarFase(fase);
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    // this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/bases/${this.formulario.idInspeccion}`,
    );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/cable-conductor/${this.formulario.idInspeccion}`,
    );
  }

  ngOnInit(): void {
    this.formAislamiento = this.fb.group({
      idAislamiento: new UntypedFormControl(),
      fase: new UntypedFormControl(),
    });

    this.formFaseR = this.fb.group({
      idFase: new UntypedFormControl(),
      fase: new UntypedFormControl(null, Validators.required),
      tipo: new UntypedFormControl(null, Validators.required),
      clase: new UntypedFormControl(null, Validators.required),
      buenEstado: new UntypedFormControl(null, Validators.required),
      numAisladores: new UntypedFormControl(null, Validators.required),
      tipoCadena: new UntypedFormControl(null, Validators.required),
      puentes: new UntypedFormControl(null, Validators.required),
      observaciones: new UntypedFormControl(null, Validators.required),
    });

    this.formFaseS = this.fb.group({
      idFase: new UntypedFormControl(),
      fase: new UntypedFormControl(null, Validators.required),
      tipo: new UntypedFormControl(null, Validators.required),
      clase: new UntypedFormControl(null, Validators.required),
      buenEstado: new UntypedFormControl(null, Validators.required),
      numAisladores: new UntypedFormControl(null, Validators.required),
      tipoCadena: new UntypedFormControl(null, Validators.required),
      puentes: new UntypedFormControl(null, Validators.required),
      observaciones: new UntypedFormControl(null, Validators.required),
    });

    this.formFaseT = this.fb.group({
      idFase: new UntypedFormControl(),
      fase: new UntypedFormControl(null, Validators.required),
      tipo: new UntypedFormControl(null, Validators.required),
      clase: new UntypedFormControl(null, Validators.required),
      buenEstado: new UntypedFormControl(null, Validators.required),
      numAisladores: new UntypedFormControl(null, Validators.required),
      tipoCadena: new UntypedFormControl(null, Validators.required),
      puentes: new UntypedFormControl(null, Validators.required),
      observaciones: new UntypedFormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

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

    // this.cols = [{ field: 'estado', header: 'ESTADO' }];

    // this.columns = [0, 1, 2, 3, 4, 5];
  }

  llenarAleatorio() {
    // entre 1 y 10
    let totalColumnas = Math.floor(Math.random() * 10 + 1);

    // crear las columnas
    for (let i = 0; i < totalColumnas; i++) {
      this.columnas.push(i);
    }

    //crear las filas entre 1 y 10
    let totalFilas = Math.floor(Math.random() * 10 + 1);

    for (let i = 0; i < totalFilas; i++) {
      let fila = [];

      for (let i = 0; i < totalColumnas; i++) {
        fila[i] = {
          valor: Math.floor(Math.random() * 100 + 1),
          editar: false,
        };
      }
      this.filas.push(fila);
    }
  }

  ocultarCeldas(celda) {
    celda.editar = true;
    this.filas.forEach((f) => {
      f.forEach((c) => {
        if (c != celda) c.editar = false;
      });
    });
  }

  onTabClose(event) {
    this.messageService.add({
      severity: 'info',
      summary: 'Se guardo fase',
      // detail: 'Index: ' + event.index,
    });
  }

  onTabOpen(event) {
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Tab Expanded',
    //   detail: 'Index: ' + event.index,
    // });
    // this.next();
  }
}
