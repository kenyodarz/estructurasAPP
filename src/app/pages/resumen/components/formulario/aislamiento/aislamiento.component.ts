import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-aislamiento',
  templateUrl: './aislamiento.component.html',
  styleUrls: ['./aislamiento.component.css'],
  animations: [
    trigger('animation', [
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out'),
      ]),
      transition('* => void', [
        animate(
          '250ms ease-in',
          style({
            height: 0,
            opacity: 0,
            transform: 'translateX(50%)',
          })
        ),
      ]),
    ]),
  ],
})
export class AislamientoComponent implements OnInit {
  formulario: Formulario = new Formulario();
  formAislamiento: FormGroup;
  formFase: FormGroup;

  tipo: any[];
  clase: any[];
  cols: any[];

  columns: number[];
  constructor(
    private formularioService: FormularioService,
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
    this.formAislamiento = this.fb.group({
      idCableConductor: new FormControl(),
    });
    this.formFase = this.fb.group({
      idFase: new FormControl(),
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

    this.cols = [{ field: 'estado', header: 'ESTADO' }];

    this.columns = [0, 1, 2, 3, 4, 5];
  }
  addColumn() {
    this.columns.push(this.columns.length);
  }

  removeColumn() {
    this.columns.splice(-1, 1);
  }
}
