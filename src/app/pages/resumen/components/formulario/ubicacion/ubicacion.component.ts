import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css'],
})
export class UbicacionComponent implements OnInit {
  formulario: Formulario = new Formulario();
  ubicacion: Ubicacion = new Ubicacion();
  formUbicacion: FormGroup;

  objetosOptions: any[];
  constructor(
    private formularioService: FormularioService,
    private ubicacionService: UbicacionService,
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
        if (formulario.idUbicacion != null) {
          // Aca va el nuevo Formulario
          this.formUbicacion.patchValue(formulario.idUbicacion);
        }
      });
  }

  guardarUbicacion(ubicacion: Ubicacion) {
    this.ubicacion = ubicacion;
    this.ubicacionService
      .save(this.ubicacion)
      .subscribe((ubicacion: Ubicacion) => {
        this.messageService.add({
          severity: 'Ubicacion',
          summary: 'SPT',
          detail: `Se ha guardado correctamente la Ubicacion ${ubicacion.idUbicacion}`,
        });
        this.formulario.idUbicacion = ubicacion;
        this.guardarFormulario();
      });
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
          `resumen/formulario/ver/${formulario.idInspeccion}/observacion/${formulario.idInspeccion}`
        );
      });
  }
  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
     //this.formulario.idUbicacion = this.formUbicacion.value;
     //this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/observacion/${this.formulario.idInspeccion}`
    );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/transposicion/${this.formulario.idInspeccion}`
    );
  }
  ngOnInit(): void {
    this.formUbicacion = this.fb.group({
      idUbicacion: new FormControl(null, Validators.required),
      torredesde: new FormControl(null, Validators.required),
      torrehasta: new FormControl(null, Validators.required),
      hayObjetos: new FormControl(),
      descripcion: new FormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.objetosOptions = [
      { label: 'HAY OBJETOS INTERMEDIOS', value: true },
      { label: 'NO HAY OBJETOS INTERMEDIOS', value: false },
    ];
  }
}
