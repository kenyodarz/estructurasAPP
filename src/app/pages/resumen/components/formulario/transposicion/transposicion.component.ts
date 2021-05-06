import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formTransposicion: FormGroup;

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
          `resumen/formulario/ver/${formulario.idInspeccion}/ubicacion/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    this.formulario.idtransposicion = this.formTransposicion.value;
    console.log(this.formulario.idtransposicion);
    this.guardarFormulario();
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/servidumbre/${this.formulario.idInspeccion}`
    );
  }

  ngOnInit(): void {
    this.formTransposicion = this.fb.group({
      idTransposicion: new FormControl(null, Validators.required),
      faseEntrada1: new FormControl(),
      faseSalida1: new FormControl(null, Validators.required),
      faseEntrada2: new FormControl(null, Validators.required),
      faseSalida2: new FormControl(null, Validators.required),
      faseEntrada3: new FormControl(null, Validators.required),
      faseSalida3: new FormControl(),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.alimentador = [
      { name: '1', code: '1' },
      { name: '2', code: '2' },
      { name: '3', code: '3' },
    ];
    
        this.items = [];
        for (let i = 1; i < 4; i++) {
          this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
  }
  
}

