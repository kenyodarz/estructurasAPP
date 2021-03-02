import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { ServidumbreService } from 'src/app/core/services/servidumbre.service';

@Component({
  selector: 'app-servidumbre',
  templateUrl: './servidumbre.component.html',
  styleUrls: ['./servidumbre.component.css'],
})
export class ServidumbreComponent implements OnInit {
  formServidumbre: FormGroup;

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
        if (formulario.idServidumbre != null) {
          // Aca va el nuevo Formulario
          // this.formInformacion.patchValue(formulario.estructura);
        }
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    // this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/transposicion/${this.formulario.idInspeccion}`
    );
  }
  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/spt/${this.formulario.idInspeccion}`
    );
  }
  ngOnInit(): void {
    this.formServidumbre = this.fb.group({
      idServidumbre: new FormControl(null, Validators.required),
      podaconRiesgo: new FormControl(),
      cantArboles: new FormControl(null, Validators.required),
      obsPoda: new FormControl(null, Validators.required),
      NoRequierePoda: new FormControl(null, Validators.required),
      obsServidumbre: new FormControl(null, Validators.required),
     
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
}
