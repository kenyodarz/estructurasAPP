import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { SptService } from 'src/app/core/services/spt.service';

@Component({
  selector: 'app-spt',
  templateUrl: './spt.component.html',
  styleUrls: ['./spt.component.css'],
})
export class SptComponent implements OnInit {
  formSpt: FormGroup;

  formulario: Formulario = new Formulario();
  constructor(
    private formularioService: FormularioService,
    private sptService: SptService,
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
          `resumen/formulario/ver/${formulario.idInspeccion}/spt/${formulario.idInspeccion}`
        );
      });
  }
  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    // this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/servidumbre/${this.formulario.idInspeccion}`
    );
  }
  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/bases/${this.formulario.idInspeccion}`
    );
  }
  ngOnInit(): void {
     this.formSpt = this.fb.group({
       idSpt: new FormControl(null, Validators.required),
       tieneSPT: new FormControl(),
       calibreSPT: new FormControl(null, Validators.required),
       tipoSPT: new FormControl(null, Validators.required),
       cant: new FormControl(null, Validators.required),
       tieneBajante: new FormControl(null, Validators.required),
       tipoBajante: new FormControl(null, Validators.required),
       calibreBajante: new FormControl(null, Validators.required),
       observaciones: new FormControl(null, Validators.required),
     });

     this.rutaActiva.params.subscribe((params: Params) => {
       this.obtenerFormulario(params.id);
     });
  }
}
