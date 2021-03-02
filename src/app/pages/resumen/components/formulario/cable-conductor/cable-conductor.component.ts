import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CableConductor } from 'src/app/core/models/cableConductor';
import { Formulario } from 'src/app/core/models/formulario';
import { cableConductorService } from 'src/app/core/services/cableConductor.service';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-cable-conductor',
  templateUrl: './cable-conductor.component.html',
  styleUrls: ['./cable-conductor.component.css'],
})
export class CableConductorComponent implements OnInit {
  cableConductor: CableConductor = new CableConductor();
  formulario: Formulario = new Formulario();

  formCableConductor: FormGroup;

  amortiguadorOpcions: any[];
  products: any[];
  selectedProducts: any[];
  constructor(
    private cableConductorService: cableConductorService,
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
        if (formulario.idCableConductor != null) {
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
    // this.guardarFormulario();
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/aislamiento/${this.formulario.idInspeccion}`
    );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/estructuraa/${this.formulario.idInspeccion}`
    );
  }

  ngOnInit(): void {
    this.formCableConductor = this.fb.group({
      idCableConductor: new FormControl(),
      calibreCableConductor: new FormControl(null, Validators.required),
      amortiguadorCableConductor: new FormControl(null, Validators.required),
      cantidadAmortiguadores: new FormControl(null, Validators.required),
      buenEstadoConductor: new FormControl(null, Validators.required),
      embarrilado: new FormControl(null, Validators.required),
      faseEmbarrilado: new FormControl(null, Validators.required),
      cantidadEmbarrilado: new FormControl(null, Validators.required),
      observacionesCableConductor: new FormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.amortiguadorOpcions = [
      { label: 'SI', value: 'true' },
      { label: 'NO', value: 'false' },
    ];
  }
}
