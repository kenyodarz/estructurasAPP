import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  formEmpalme: FormGroup;
  formDeshilachado: FormGroup;

  amortiguadorOpcions: any[];
  products: any[];
  selectedProducts: any[];
  checked: string = 'No aplica';
  mostrarFaseR: boolean = false;
  mostrarFaseS: boolean = false;
  mostrarFaseT: boolean = false;
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

  OnChangeBuenEstado() {
    this.embarrilado = false;
  }

  ngOnInit(): void {
    this.formCableConductor = this.fb.group({
      idCableConductor: new FormControl(),
      calibreCableConductor: new FormControl(null, Validators.required),
      amortiguadorCableConductor: new FormControl(null, Validators.required),
      cantidadAmortiguadores: new FormControl(null, Validators.required),
      buenEstadoConductor: new FormControl(null, Validators.required),
      embarrilado: new FormControl(),
      deshilachado: new FormControl(),
      faseEmbarrilado: new FormControl(),
      cantidadEmbarrilado: new FormControl(),
      observacionesCableConductor: new FormControl(null, Validators.required),
    });
    this.formEmpalme = this.fb.group({
      idEmpalme: new FormControl(),
      fase: new FormControl(null, Validators.required),
      cantidadManual: new FormControl(null, Validators.required),
      cantidadFullTension: new FormControl(null, Validators.required),
      cantidadBlindaje: new FormControl(null, Validators.required),
      noAplica: new FormControl(),
    });
    this.formDeshilachado = this.fb.group({
      idDeshilachado: new FormControl(),
      fase: new FormControl(null, Validators.required),
      numeroHilos: new FormControl(null, Validators.required),
      distancia: new FormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.amortiguadorOpcions = [
      { label: 'SI', value: 'true' },
      { label: 'NO', value: 'false' },
    ];
  }

  get buenEstado() {
    return this.formCableConductor.get('buenEstadoConductor').value;
  }

  get embarrilado() {
    return this.formCableConductor.get('embarrilado').value;
  }

  set embarrilado(estado: boolean) {
    this.formCableConductor.patchValue({
      embarrilado: estado,
    });
  }
}
