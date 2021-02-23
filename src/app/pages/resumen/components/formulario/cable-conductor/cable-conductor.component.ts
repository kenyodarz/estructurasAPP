import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Estructura } from 'src/app/core/models/estructura';
import { Formulario } from 'src/app/core/models/formulario';
import { EstructuraService } from 'src/app/core/services/estructura.service';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-cable-conductor',
  templateUrl: './cable-conductor.component.html',
  styleUrls: ['./cable-conductor.component.css'],
})
export class CableConductorComponent implements OnInit {
  estructura: Estructura = new Estructura();
  formulario: Formulario = new Formulario();
  formCableConductor: FormGroup;
  amortiguadorOpcions: any[];
  constructor(
    private estructuraService: EstructuraService,
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.amortiguadorOpcions = [
      { label: 'SI', value: 'true' },
      { label: 'NO', value: 'false' },
    ];
  }

  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.estructura != null) {
        //  this.formCableConductor.patchValue(formulario.estructura);
        }
     //   console.log(this.formulario);
      });
  }

  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'CableConductor',
          detail: `se ha actualizado el formulario ${formulario.idInspeccion}`,
        });
        this.router.navigateByUrl(
          `resumen/formulario/ver/${formulario.idInspeccion}/aislamiento/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    //this.formulario.estructura = this.formInformacion.value as Estructura;
    this.guardarFormulario();
  }

  onSubmit() {}
  ngOnInit(): void {}
}
