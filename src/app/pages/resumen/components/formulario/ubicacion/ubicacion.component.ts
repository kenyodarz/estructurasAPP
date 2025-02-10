import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { UbicacionOne } from 'src/app/core/models/ubicacionOne';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { UbicacionOneService } from 'src/app/core/services/ubicacionOne.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css'],
})
export class UbicacionComponent implements OnInit {
  formulario: Formulario = new Formulario();
  ubicacionOne: UbicacionOne = new UbicacionOne();
  ubicacion: Ubicacion = new Ubicacion();
  formUbicacion: UntypedFormGroup;
  formUbicacionOneI: UntypedFormGroup;
  formUbicacionOneII: UntypedFormGroup;

  objetosOptions: any[];
  cities: any[];
  selectedCity2: string;
  ubicacionesOne: UbicacionOne[] = [];
  mostrar: boolean = false;
  constructor(
    private formularioService: FormularioService,
    private ubicacionService: UbicacionService,
    private ubicacionOneService: UbicacionOneService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ) {}
  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.idUbicacion != null) {
          if (formulario.idUbicacion.ubicacionesOne.length > 0) {
            this.mostrar = true;
          }
          // Aca va el nuevo Formulario
          this.formUbicacion.patchValue(formulario.idUbicacion);
          this.cargarDatos(formulario.idUbicacion);
        }
      });
  }

  cargarDatos(ubicacion: Ubicacion) {
    console.log(ubicacion);
    this.ubicacion = ubicacion;
    this.formUbicacion.patchValue(ubicacion);
    ubicacion.ubicacionesOne.forEach((ubicacionOne) => {
      switch (ubicacionOne.torre) {
        case 'I':
          this.formUbicacionOneI.patchValue(ubicacionOne);
          break;
        case 'II':
          this.formUbicacionOneII.patchValue(ubicacionOne);
          break;

        default:
          console.warn('No existe la ubicacion');
          break;
      }
    });
    this.ubicacionesOne = this.ubicacion.ubicacionesOne;
  }

  guardarUbicacion(ubicacionOne: UbicacionOne) {
    this.ubicacionOneService
      .guardarUbicacionOneconUbicacion(
        this.formulario.idUbicacion.idUbicacion,
        ubicacionOne,
      )
      .subscribe((ubicacionOneResul: UbicacionOne) => {
        this.ubicacionService
          .asignarUbicacionOne(
            this.formulario.idUbicacion.idUbicacion,
            ubicacionOneResul,
          )
          .subscribe((data) => {
            this.obtenerFormulario(this.formulario.idInspeccion);
          });
        this.messageService.add({
          severity: 'info',
          summary: 'UbicacionOne',
          detail: `Se ha guardado correctamente la ubicacion ${ubicacionOneResul.idUbicacionOne}`,
        });
      });
  }

  guardarUbicacionOneI() {
    console.log((this.ubicacionOne = this.formUbicacionOneI.value));
    let ubicacionesOne: UbicacionOne = this.formUbicacionOneI.value;
    ubicacionesOne.torre = 'I';
    this.guardarUbicacion(ubicacionesOne);
  }

  guardarUbicacionOneII() {
    let ubicacionesOne: UbicacionOne = this.formUbicacionOneII.value;
    ubicacionesOne.torre = 'II';
    this.guardarUbicacion(ubicacionesOne);
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
          `resumen/formulario/ver/${formulario.idInspeccion}/observacion/${formulario.idInspeccion}`,
        );
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    //this.formulario.idUbicacion = this.formUbicacion.value;
    //this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/observacion/${this.formulario.idInspeccion}`,
    );
  }

  next() {
    this.ubicacion = this.formUbicacion.value;
    this.ubicacion.OneOrTwo = 'xxxxxxx';
    console.log((this.ubicacion = this.formUbicacion.value));
    console.log((this.ubicacion.OneOrTwo = 'xxxxxxx'));
    this.ubicacionService
      .save(this.ubicacion)
      .subscribe((ubicacion: Ubicacion) => {
        this.formulario.idUbicacion = ubicacion;
        this.formularioService
          .save(this.formulario)
          .subscribe((formulario: Formulario) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Ubicacion',
              detail: `se ha actualizado la Ubicacion ${formulario.idUbicacion}`,
            });
          });
      });
  }
  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/transposicion/${this.formulario.idInspeccion}`,
    );
  }
  ngOnInit(): void {
    this.formUbicacion = this.fb.group({
      idUbicacion: new UntypedFormControl(),
      OneOrTwo: new UntypedFormControl(),
    });

    this.formUbicacionOneI = this.fb.group({
      idUbicacionOne: new UntypedFormControl(),
      torredesde: new UntypedFormControl(null, Validators.required),
      torrehasta: new UntypedFormControl(null, Validators.required),
      hayObjetos: new UntypedFormControl(),
      descripcion: new UntypedFormControl(null, Validators.required),
    });

    this.formUbicacionOneII = this.fb.group({
      idUbicacionOne: new UntypedFormControl(),
      torredesde: new UntypedFormControl(null, Validators.required),
      torrehasta: new UntypedFormControl(null, Validators.required),
      hayObjetos: new UntypedFormControl(),
      descripcion: new UntypedFormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.objetosOptions = [
      { label: 'HAY OBJETOS INTERMEDIOS', value: true },
      { label: 'NO HAY OBJETOS INTERMEDIOS', value: false },
    ];

    this.cities = [
      { name: 'New York', value: 'NY' },
      { name: 'Rome', value: 'RM' },
      { name: 'London', value: 'LDN' },
      { name: 'Istanbul', value: 'IST' },
      { name: 'Paris', value: 'PRS' },
    ];
  }
}
