// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { EstructuraService } from 'src/app/core/services/estructura.service';
// Modelos
import { Estructura } from 'src/app/core/models/estructura';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {
  estructura: Estructura = new Estructura();
  formInformacion: FormGroup;
  stateOptions: { label: string; value: boolean }[];

  constructor(
    private estructuraService: EstructuraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  buscarEstructura() {
    console.log(this.numEstructura);
    this.estructuraService
      .buscarTorresPorNumero(this.numEstructura, this.circuito)
      .subscribe((estructura: Estructura) => {
        this.formInformacion.patchValue(estructura);
      });
  }
  onSubmit() {}

  get numEstructura() {
    return this.formInformacion.get('numEstructura').value;
  }
  get circuito() {
    return this.formInformacion.get('circuito').value;
  }

  ngOnInit(): void {
    this.formInformacion = this.fb.group({
      idEstructura: new FormControl(null, Validators.required),
      numEstructura: new FormControl(null, Validators.required),
      circuito: new FormControl(null, Validators.required),
      ubicacion: new FormControl(null, Validators.required),
      predioPublico: new FormControl(null, Validators.required),
      coordinadaX: new FormControl(null, Validators.required),
      coordinadaY: new FormControl(null, Validators.required),
      alturaSobreNivelMar: new FormControl(null, Validators.required),
    });
    this.stateOptions = [
      { label: 'Publico', value: true },
      { label: 'Privado', value: false },
    ];
  }
  nextPage() {
    this.router.navigate(['apantallamiento']);
  }
}
