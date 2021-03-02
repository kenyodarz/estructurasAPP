import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TransposicionService } from 'src/app/core/services/transposicion.service';

@Component({
  selector: 'app-transposicion',
  templateUrl: './transposicion.component.html',
  styleUrls: ['./transposicion.component.css'],
})
export class TransposicionComponent implements OnInit {
   formTransposicion: FormGroup;

  formulario: Formulario = new Formulario();
  constructor(
     private formularioService: FormularioService,
    private transposicionService: TransposicionService,
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
          `resumen/formulario/ver/${formulario.idInspeccion}/transposicion/${formulario.idInspeccion}`
        );
      });
  }
  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    // this.formulario.estructura = this.formInformacion.value as Estructura;
    // this.guardarFormulario();
      this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/ubicacion/${this.formulario.idInspeccion}`
    );
  }
  prevPage() {
      this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/servidumbre/${this.formulario.idInspeccion}`
    );
  }
  ngOnInit(): void {
    this.formTransposicion = this.fb.group({
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

