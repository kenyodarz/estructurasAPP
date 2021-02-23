import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-spt',
  templateUrl: './spt.component.html',
  styleUrls: ['./spt.component.css'],
})
export class SptComponent implements OnInit {
  formulario: Formulario = new Formulario();
  constructor(
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
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
  }
  prevPage() {}
  ngOnInit(): void {}
}
