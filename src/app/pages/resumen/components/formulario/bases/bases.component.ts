import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Router, Params } from '@angular/router';

// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { BasesService } from 'src/app/core/services/bases.service';
import { Bases } from 'src/app/core/models/bases';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css'],
})
export class BasesComponent implements OnInit {
  formBases: FormGroup;
  formSubBase: FormGroup;

  formulario: Formulario = new Formulario();
  bases: Bases = new Bases();
  angulos: any[];
  constructor(
    private formularioService: FormularioService,
    private basesService: BasesService,
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
        if (formulario.idBases != null) {
          // Aca va el nuevo Formulario
          this.formBases.patchValue(formulario.idBases);
        }
      });
  }

  guardarBases(bases: Bases) {
    this.bases = bases;
    this.basesService.save(this.bases).subscribe((bases: Bases) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Bases',
        detail: `Se ha guardado correctamente las Bases ${bases.idBase}`,
      });
      this.formulario.idBases = bases;
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
          `resumen/formulario/ver/${formulario.idInspeccion}/spt/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    //this.bases = this.formBases.value;
    //this.guardarFormulario;
    console.log(this.bases);
    // console.info(this.formEstructuraa.value);
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/spt/${this.formulario.idInspeccion}`
     );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/aislamiento/${this.formulario.idInspeccion}`
    );
  }

  ngOnInit(): void {
    this.formBases = this.fb.group({
      idBase: new FormControl(null, Validators.required),
      buenEstado: new FormControl(null, Validators.required),
      obsBase: new FormControl(null, Validators.required),
    });
    this.formSubBase = this.fb.group({
      idSubBase: new FormControl(null, Validators.required),
      buena: new FormControl(),
      enterrada: new FormControl(),
      fracturada: new FormControl(),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.angulos = [
      { label: 'BUEN ESTADO', value: 'buen' },
      { label: 'MAL ESTADO', value: 'mal' },
    ];
  }
}
