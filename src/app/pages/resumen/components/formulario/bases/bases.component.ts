import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Router, Params } from '@angular/router';

// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { BasesService } from 'src/app/core/services/bases.service';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css'],
})
export class BasesComponent implements OnInit {
  formBases: FormGroup;

  formulario: Formulario = new Formulario();
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
          //  this.formEstructuraa.patchValue(formulario.idTorres);
        }
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    //this.estructuraa = this.formEstructuraa.value;
    // this.guardarFormulario;
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
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
}
