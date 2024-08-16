import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { Spt } from 'src/app/core/models/spt';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { SptService } from 'src/app/core/services/spt.service';

@Component({
  selector: 'app-spt',
  templateUrl: './spt.component.html',
  styleUrls: ['./spt.component.css'],
})
export class SptComponent implements OnInit {
  formSpt: UntypedFormGroup;

  formulario: Formulario = new Formulario();
  spt: Spt = new Spt();
  sptOptions: any[];
  bajante: any[];
  constructor(
    private formularioService: FormularioService,
    private sptService: SptService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}
  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        console.log(formulario);
        if (formulario.idSpt != null) {
          // Aca va el nuevo Formulario
          this.formSpt.patchValue(formulario.idSpt);
        }
      });
  }

  guardarSPT(spt: Spt) {
    this.spt = spt;
    this.sptService.save(this.spt).subscribe((spt: Spt) => {
      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'SPT',
      //   detail: `Se ha guardado correctamente el SPT ${spt.idSpt}`,
      // });
      this.formulario.idSpt = spt;
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
          `resumen/formulario/ver/${formulario.idInspeccion}/servidumbre/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    this.spt = this.formSpt.value;
    this.guardarSPT(this.spt);
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/bases/${this.formulario.idInspeccion}`
    );
  }

  OnChangeAnilloContrapeso() {
    this.Anillo = false;
    this.Contrapeso = false;

  }

  OnChangeAnillo() {
    this.AnilloContrapeso = false;
    this.Contrapeso = false;

  }

  OnChangeContrapeso() {
    this.Anillo = false;
    this.AnilloContrapeso = false;
  }

  ngOnInit(): void {
    this.formSpt = this.fb.group({
      idSpt: new UntypedFormControl(),
      tieneSPT: new UntypedFormControl(null, Validators.required),
      calibreSPT: new UntypedFormControl(null, Validators.required),
      tipoContrapeso: new UntypedFormControl(),
      tipoAnilloContrapeso: new UntypedFormControl(),
      tipoAnillo: new UntypedFormControl(),
      cant: new UntypedFormControl(null, Validators.required),
      tieneBajante: new UntypedFormControl(null, Validators.required),
      tipoBajante: new UntypedFormControl(null, Validators.required),
      calibreBajante: new UntypedFormControl(null, Validators.required),
      observaciones: new UntypedFormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.sptOptions = [
      { label: 'TIENE', value: true },
      { label: 'NO TIENE', value: false },
    ];
    this.bajante = [
      { label: 'TIENE', value: true },
      { label: 'NO TIENE', value: false },
    ];
  }

  get Contrapeso() {
    return this.formSpt.get('tipoContrapeso').value;
  }

  set Contrapeso(estado: boolean) {
    this.formSpt.patchValue({
      tipoContrapeso: estado,
    });
  }

  get AnilloContrapeso() {
    return this.formSpt.get('tipoAnilloContrapeso').value;
  }

  set AnilloContrapeso(estado: boolean) {
    this.formSpt.patchValue({
      tipoAnilloContrapeso: estado,
    });
  }

  get Anillo() {
    return this.formSpt.get('tipoAnillo').value;
  }

  set Anillo(estado: boolean) {
    this.formSpt.patchValue({
      tipoAnillo: estado,
    });
  }
}
