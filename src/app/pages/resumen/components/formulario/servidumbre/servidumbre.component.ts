import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formulario } from 'src/app/core/models/formulario';
import { Servidumbre } from 'src/app/core/models/servidumbre';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { ServidumbreService } from 'src/app/core/services/servidumbre.service';

@Component({
  selector: 'app-servidumbre',
  templateUrl: './servidumbre.component.html',
  styleUrls: ['./servidumbre.component.css'],
})
export class ServidumbreComponent implements OnInit {
  formServidumbre: UntypedFormGroup;

  formulario: Formulario = new Formulario();
  servidumbre: Servidumbre = new Servidumbre();
  constructor(
    private formularioService: FormularioService,
    private servidumbreService: ServidumbreService,
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
        if (formulario.idServidumbre != null) {
          // Aca va el nuevo Formulario
          this.formServidumbre.patchValue(formulario.idServidumbre);
        }
      });
  }

  guardarServidumbre(servidumbre: Servidumbre) {
    this.servidumbre = servidumbre;
    this.servidumbreService
      .save(this.servidumbre)
      .subscribe((servidumbre: Servidumbre) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Servidumbre',
          detail: `Se ha guardado correctamente la Servidumbre ${servidumbre.idServidumbre}`,
        });
        this.formulario.idServidumbre = servidumbre;
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
          `resumen/formulario/ver/${formulario.idInspeccion}/transposicion/${formulario.idInspeccion}`
        );
      });
  }

  nextPage() {
    this.servidumbre = this.formServidumbre.value;
    this.guardarServidumbre(this.servidumbre);
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/spt/${this.formulario.idInspeccion}`
    );
  }

  OnChangePodacom() {
    this.NoRequierePoda = false;
    this.podasinRiesgo = false;
  }

  OnChangePodasin() {
    this.podaconRiesgo = false;
    this.NoRequierePoda = false;
  }

  OnChangeNorequiere() {
    this.podaconRiesgo = false;
    this.podasinRiesgo = false;
  }

  OnChangeSiAplica() {
    this.noAplica = false;
  }

  OnChangeNoAplica() {
    this.pasoBT = false;
    this.pasoMT = false;
    this.invasion = false;
  }

  ngOnInit(): void {
    this.formServidumbre = this.fb.group({
      idServidumbre: new UntypedFormControl(),
      podaconRiesgo: new UntypedFormControl(),
      podasinRiesgo: new UntypedFormControl(),
      cantArboles: new UntypedFormControl(),
      obsPoda: new UntypedFormControl(null, Validators.required),
      NoRequierePoda: new UntypedFormControl(),
      obsServidumbre: new UntypedFormControl(null, Validators.required),
      noAplica: new UntypedFormControl(),
      invasion: new UntypedFormControl(),
      pasoMT: new UntypedFormControl(),
      pasoBT: new UntypedFormControl(),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });
  }
  get podaconRiesgo() {
    return this.formServidumbre.get('podaconRiesgo').value;
  }

  set podaconRiesgo(estado: boolean) {
    this.formServidumbre.patchValue({
      podaconRiesgo: estado,
    });
  }
  get podasinRiesgo() {
    return this.formServidumbre.get('podasinRiesgo').value;
  }

  set podasinRiesgo(estado: boolean) {
    this.formServidumbre.patchValue({
      podasinRiesgo: estado,
    });
  }

  get NoRequierePoda() {
    return this.formServidumbre.get('NoRequierePoda').value;
  }

  set NoRequierePoda(estado: boolean) {
    this.formServidumbre.patchValue({
      NoRequierePoda: estado,
    });
  }
  get invasion() {
    return this.formServidumbre.get('invasion').value;
  }

  set invasion(estado: boolean) {
    this.formServidumbre.patchValue({
      invasion: estado,
    });
  }
  get pasoMT() {
    return this.formServidumbre.get('pasoMT').value;
  }

  set pasoMT(estado: boolean) {
    this.formServidumbre.patchValue({
      pasoMT: estado,
    });
  }
  get obsPoda() {
    return this.formServidumbre.get('obsPoda').value;
  }

  set obsPoda(estado: string) {
    this.formServidumbre.patchValue({
      obsPoda: estado,
    });
  }
  get pasoBT() {
    return this.formServidumbre.get('pasoBT').value;
  }

  set pasoBT(estado: boolean) {
    this.formServidumbre.patchValue({
      pasoBT: estado,
    });
  }
  get noAplica() {
    return this.formServidumbre.get('noAplica').value;
  }

  get cantArboles() {
    return this.formServidumbre.get('cantArboles').value;
  }
  set cantArboles(cantidad: number) {
    this.formServidumbre.patchValue({
      cantArboles: cantidad,
    });
  }

  set noAplica(estado: boolean) {
    this.formServidumbre.patchValue({
      noAplica: estado,
    });
  }
  get conRiesgo() {
    return this.formServidumbre.get('podaconRiesgo').value;
  }

  get sinRiesgo() {
    return this.formServidumbre.get('podasinRiesgo').value;
  }

  sinRiesgoOnChange() {
    console.log('cambio');
    if (this.sinRiesgo === false) {
      this.cantArboles = 0;
      this.obsPoda = " ";
    }
  }
}
