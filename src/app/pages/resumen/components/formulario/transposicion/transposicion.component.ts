import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { Transposicion } from 'src/app/core/models/transposicion';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TransposicionService } from 'src/app/core/services/transposicion.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-transposicion',
  templateUrl: './transposicion.component.html',
  styleUrls: ['./transposicion.component.css'],
})
export class TransposicionComponent implements OnInit {
  formTransposicion: UntypedFormGroup;

  formulario: Formulario = new Formulario();
  transposicion: Transposicion = new Transposicion();

  items: SelectItem[];

  item: string;
  alimentador: any[];
  constructor(
    private formularioService: FormularioService,
    private transposicionService: TransposicionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ) {}
  obtenerFormulario(idInspeccion: string) {
    this.formularioService
      .getOne(idInspeccion)
      .subscribe((formulario: Formulario) => {
        this.formulario = formulario;
        if (formulario.estructura != null) {
          // Aca va el nuevo Formulario
          this.formTransposicion.patchValue(formulario.idtransposicion);
        }
      });
  }

  guardarTransposicion(transposicion: Transposicion) {
    this.transposicion = transposicion;
    this.transposicionService
      .save(this.transposicion)
      .subscribe((transposicion: Transposicion) => {
        this.messageService.add({
          severity: 'Transposicion',
          summary: 'SPT',
          detail: `Se ha guardado correctamente la transposicion ${transposicion.idTransposicion}`,
        });
        this.formulario.idtransposicion = transposicion;
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
          `resumen/formulario/ver/${formulario.idInspeccion}/ubicacion/${formulario.idInspeccion}`,
        );
      });
  }

  nextPage() {
    // this.transposicion = this.formTransposicion.value;
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    this.transposicion = this.formTransposicion.value;
    console.log(this.transposicion);
    this.guardarTransposicion(this.transposicion);

    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/ubicacion/${this.formulario.idInspeccion}`,
    );
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/servidumbre/${this.formulario.idInspeccion}`,
    );
  }

  ngOnInit(): void {
    this.formTransposicion = this.fb.group({
      idTransposicion: new UntypedFormControl(),
      faseEntrada1: new UntypedFormControl(null, Validators.required),
      faseSalida1: new UntypedFormControl(null, Validators.required),
      faseEntrada2: new UntypedFormControl(null, Validators.required),
      faseSalida2: new UntypedFormControl(null, Validators.required),
      faseEntrada3: new UntypedFormControl(null, Validators.required),
      faseSalida3: new UntypedFormControl(null, Validators.required),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.alimentador = [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
    ];

    this.items = [];
    for (let i = 1; i < 4; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }
  }
}
