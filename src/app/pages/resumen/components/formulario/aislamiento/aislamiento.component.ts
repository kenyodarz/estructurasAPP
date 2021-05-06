import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AislamientoService } from 'src/app/core/services/aislamiento.service';
import { Aislamiento } from 'src/app/core/models/aislamiento';

@Component({
  selector: 'app-aislamiento',
  templateUrl: './aislamiento.component.html',
  styleUrls: ['./aislamiento.component.css'],
  // animations: [
  //   trigger('animation',[
  //     state(
  //       'visible',
  //       style({
  //         transform: 'translateX(0)',
  //         opacity: 1,
  //       })
  //     ),
  //     transition('void => *', [
  //       style({ transform: 'translateX(50%)', opacity: 0}),
  //       animate('300ms ease-out'),

  //     ]),
  //     transition('* => void', [
  //       animate(
  //         '250ms ease-in',
  //         style({
  //           height: 0,
  //           opacity: 0,
  //           transform: 'translateX(50%)',
  //         })
  //       ),
  //     ]),
  //   ]),
  // ],
})
export class AislamientoComponent implements OnInit {
  aislamiento: Aislamiento = new Aislamiento();
  formulario: Formulario = new Formulario();
  formAislamientoR: FormGroup;
  formAislamientoS: FormGroup;
  formAislamientoT: FormGroup;

  tipo: any[];
  tipoCadena: any[];
  puentes: any[];
  clase: any[];
  cols: any[];

  filas = [];
  columnas = [];

  columns: number[];
  constructor(
    private formularioService: FormularioService,
    private aislamientoService: AislamientoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute
  ) {}

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.idAisladores != null) {
          // Aca va el nuevo Formulario
          // this.formInformacion.patchValue(formulario.estructura);
        }
      });
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
          `resumen/formulario/ver/${formulario.idInspeccion}/bases/${formulario.idInspeccion}`
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

    this.aislamiento = this.formAislamientoR.value;
    console.log((this.aislamiento = this.formAislamientoR.value));
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
              detail: `se ha actualizado el aislamiento ${aislamiento.idAislamiento}`,
            });
          });
      });

  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    // this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/bases/${this.formulario.idInspeccion}`
    );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/cable-conductor/${this.formulario.idInspeccion}`
    );
  }

  ngOnInit(): void {
    this.formAislamientoR = this.fb.group({
      idAislamiento: new FormControl(),
      fase: new FormControl(),
      tipo: new FormControl(),
      clase: new FormControl(),
      buenEstado: new FormControl(),
      numAisladores: new FormControl(),
      tipoCadena: new FormControl(),
      puentes: new FormControl(),
      observaciones: new FormControl(),
      idInspecciones: new FormControl(),
    });
     this.formAislamientoS = this.fb.group({
       idAislamiento: new FormControl(),
       fase: new FormControl(),
       tipo: new FormControl(),
       clase: new FormControl(),
       buenEstado: new FormControl(),
       numAisladores: new FormControl(),
       tipoCadena: new FormControl(),
       puentes: new FormControl(),
       observaciones: new FormControl(),
       idInspecciones: new FormControl(),
     });
     this.formAislamientoT = this.fb.group({
       idAislamiento: new FormControl(),
       fase: new FormControl(),
       tipo: new FormControl(),
       clase: new FormControl(),
       buenEstado: new FormControl(),
       numAisladores: new FormControl(),
       tipoCadena: new FormControl(),
       puentes: new FormControl(),
       observaciones: new FormControl(),
       idInspecciones: new FormControl(),
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
}
