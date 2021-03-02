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
        if (formulario.idInspeccion != null) {
          // Aca va el nuevo Formulario
          // this.formInformacion.patchValue(formulario.estructura);
        }
      });
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/observacion/${this.formulario.idInspeccion}`
    );
  }
  ngOnInit(): void {
    this.formConfirmacion = this.fb.group({
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
