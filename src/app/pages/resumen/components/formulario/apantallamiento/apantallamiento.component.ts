// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
// Services
import { ApantallamientoService } from 'src/app/core/services/apantallamiento.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
// Modelos
import { Estructura } from 'src/app/core/models/estructura';
import { Formulario } from 'src/app/core/models/formulario';

@Component({
  selector: 'app-apantallamiento',
  templateUrl: './apantallamiento.component.html',
  styleUrls: ['./apantallamiento.component.css'],
})
export class ApantallamientoComponent implements OnInit {
  formulario: Formulario = new Formulario();
  constructor(
    private apantallaminetoService: ApantallamientoService,
    private formularioService: FormularioService,
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
        if (formulario.estructura != null) {
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
          summary: 'Información',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/apantallamiento/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    this.guardarFormulario();
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
}
