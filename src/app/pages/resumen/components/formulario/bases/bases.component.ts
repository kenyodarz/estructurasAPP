import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/models/formulario';
import { ActivatedRoute, Router, Params } from '@angular/router';

// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { BasesService } from 'src/app/core/services/bases.service';
import { Bases } from 'src/app/core/models/bases';
import { SubBase } from 'src/app/core/models/subBase';
import { SubBaseService } from 'src/app/core/services/subBase.service';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css'],
})
export class BasesComponent implements OnInit {
  formBases: FormGroup;
  formSubBaseI: FormGroup;
  formSubBaseII: FormGroup;
  formSubBaseIII: FormGroup;
  formSubBaseIV: FormGroup;

  checked2: boolean = true;
  mostrar: boolean = false;

  formulario: Formulario = new Formulario();
  bases: Bases = new Bases();
  subBase: SubBase = new SubBase();
  subBases: SubBase[] = [];
  angulos: any[];
  constructor(
    private formularioService: FormularioService,
    private subBaseService: SubBaseService,
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
          if (formulario.idBases.subbases.length > 0) {
            
            this.mostrar = true;
          }
          // Aca va el nuevo Formulario
          this.formBases.patchValue(formulario.idBases);
          this.cargarDatos(formulario.idBases);
        }
      });
  }
  cargarDatos(base: Bases) {
    console.log(base);
    this.bases = base;
    this.formBases.patchValue(base);
    base.subbases.forEach((subbases) => {
      switch (subbases.base) {
        case 'I':
          this.formSubBaseI.patchValue(subbases);
          break;
        case 'II':
          this.formSubBaseII.patchValue(subbases);
          break;
        case 'III':
          this.formSubBaseIII.patchValue(subbases);
          break;
        case 'IV':
          this.formSubBaseIV.patchValue(subbases);
          break;

        default:
          console.warn('No existe la Subbase de la base');
          break;
      }
    });
    this.subBases = this.bases.subbases;
  }
  // guardarBases() {
  //   // this.bases = bases;
  //   this.basesService.save(this.bases).subscribe((bases: Bases) => {
  //     this.guardarSubBases(bases);
  //     this.formulario.idBases = bases;
  //     this.guardarFormulario();
  //   });
  // }

  guardarSubBases(subBase: SubBase) {
    this.subBaseService
      .guardarSubBaseConBase(this.formulario.idBases.idBase, subBase)
      .subscribe((subBase: SubBase) => {
        this.messageService.add({
          severity: 'info',
          summary: 'SubBase',
          detail: `Se ha guardado correctamente la SubBase ${subBase.idSubBase}`,
        });
      });
  }

  guardarSubBaseI() {
    let subBase: SubBase = this.formSubBaseI.value;
    subBase.base = 'I';
    this.guardarSubBases(subBase);
    console.log(subBase);
  }

  guardarSubBaseII() {
    let subBase: SubBase = this.formSubBaseII.value;
    subBase.base = 'II';
    this.guardarSubBases(subBase);
    console.log(subBase);
  }

  guardarSubBaseIII() {
    let subBase: SubBase = this.formSubBaseIII.value;
    subBase.base = 'III';
    this.guardarSubBases(subBase);
    console.log(subBase);
  }

  guardarSubBaseIV() {
    let subBase: SubBase = this.formSubBaseIV.value;
    subBase.base = 'IV';
    this.guardarSubBases(subBase);
    console.log(subBase);
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

  next() {
    this.bases = this.formBases.value;
    console.log((this.bases = this.formBases.value));
    this.basesService.save(this.bases).subscribe((bases: Bases) => {
      this.formulario.idBases = bases;
      this.formularioService
        .save(this.formulario)
        .subscribe((formulario: Formulario) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Bases',
            detail: `se ha actualizado la base ${bases.idBase}`,
          });
        });
    });
  }

  nextPage() {
    // this.subBase = this.formSubBaseI.value;
    // // this.subBase = this.formSubBaseII.value;
    // // this.subBase = this.formSubBaseIII.value;
    // // this.subBase = this.formSubBaseIV.value;
    // this.bases = this.formBases.value;
    // se igual el formulario de apantallamiento a apantallamiento en el formulario
    //this.bases = this.formBases.value;
    //this.guardarFormulario;
    console.log(this.bases);
    // console.info(this.formEstructuraa.value);
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/spt/${this.formulario.idInspeccion}`
    );
    // this.guardarBases();
  }

  OnChangeBuenEstadoI() {
    this.enterradaI = false;
    this.fracturadaI = false;
  }

  OnChangeMalEstadoI() {
    this.buenEstadoI = false;
  }

  OnChangeBuenEstadoII() {
    this.enterradaII = false;
    this.fracturadaII = false;
  }

  OnChangeMalEstadoII() {
    this.buenEstadoII = false;
  }

  OnChangeBuenEstadoIII() {
    this.enterradaIII = false;
    this.fracturadaIII = false;
  }

  OnChangeMalEstadoIII() {
    this.buenEstadoIII = false;
  }
  OnChangeBuenEstadoIV() {
    this.enterradaIV = false;
    this.fracturadaIV = false;
  }

  OnChangeMalEstadoIV() {
    this.buenEstadoIV = false;
  }

  prevPage() {
    this.router.navigateByUrl(
      `resumen/formulario/ver/${this.formulario.idInspeccion}/aislamiento/${this.formulario.idInspeccion}`
    );
  }

  ngOnInit(): void {
    this.formBases = this.fb.group({
      idBase: new FormControl(),
      buenEstado: new FormControl(null, Validators.required),
      obsBase: new FormControl(null, Validators.required),
      boton: new FormControl(),
    });
    this.formSubBaseI = this.fb.group({
      idSubBase: new FormControl(null, Validators.required),
      buena: new FormControl(),
      enterrada: new FormControl(),
      fracturada: new FormControl(),
    });
    this.formSubBaseII = this.fb.group({
      idSubBase: new FormControl(null, Validators.required),
      buena: new FormControl(),
      enterrada: new FormControl(),
      fracturada: new FormControl(),
    });

    this.formSubBaseIII = this.fb.group({
      idSubBase: new FormControl(null, Validators.required),
      buena: new FormControl(),
      enterrada: new FormControl(),
      fracturada: new FormControl(),
    });

    this.formSubBaseIV = this.fb.group({
      idSubBase: new FormControl(null, Validators.required),
      buena: new FormControl(),
      enterrada: new FormControl(),
      fracturada: new FormControl(),
    });

    this.rutaActiva.params.subscribe((params: Params) => {
      this.obtenerFormulario(params.id);
    });

    this.angulos = [
      { label: 'BUEN ESTADO', value: true },
      { label: 'MAL ESTADO', value: false },
    ];
  }
  get buenEstadoI() {
    return this.formSubBaseI.get('buena').value;
  }

  set buenEstadoI(estado: boolean) {
    this.formSubBaseI.patchValue({
      buena: estado,
    });
  }

  get buenEstadoII() {
    return this.formSubBaseII.get('buena').value;
  }

  set buenEstadoII(estado: boolean) {
    this.formSubBaseII.patchValue({
      buena: estado,
    });
  }
  get buenEstadoIII() {
    return this.formSubBaseIII.get('buena').value;
  }

  set buenEstadoIII(estado: boolean) {
    this.formSubBaseIII.patchValue({
      buena: estado,
    });
  }
  get buenEstadoIV() {
    return this.formSubBaseIV.get('buena').value;
  }

  set buenEstadoIV(estado: boolean) {
    this.formSubBaseIV.patchValue({
      buena: estado,
    });
  }

  get enterradaI() {
    return this.formSubBaseI.get('enterrada').value;
  }

  set enterradaI(estado: boolean) {
    this.formSubBaseI.patchValue({
      enterrada: estado,
    });
  }

  get enterradaII() {
    return this.formSubBaseII.get('enterrada').value;
  }

  set enterradaII(estado: boolean) {
    this.formSubBaseII.patchValue({
      enterrada: estado,
    });
  }
  get enterradaIII() {
    return this.formSubBaseIII.get('enterrada').value;
  }

  set enterradaIII(estado: boolean) {
    this.formSubBaseIII.patchValue({
      enterrada: estado,
    });
  }
  get enterradaIV() {
    return this.formSubBaseIV.get('enterrada').value;
  }

  set enterradaIV(estado: boolean) {
    this.formSubBaseIV.patchValue({
      enterrada: estado,
    });
  }

  get fracturadaI() {
    return this.formSubBaseI.get('fracturada').value;
  }

  set fracturadaI(estado: boolean) {
    this.formSubBaseI.patchValue({
      fracturada: estado,
    });
  }

  get fracturadaII() {
    return this.formSubBaseII.get('fracturada').value;
  }

  set fracturadaII(estado: boolean) {
    this.formSubBaseII.patchValue({
      fracturada: estado,
    });
  }

  get fracturadaIII() {
    return this.formSubBaseIII.get('fracturada').value;
  }

  set fracturadaIII(estado: boolean) {
    this.formSubBaseIII.patchValue({
      fracturada: estado,
    });
  }

  get fracturadaIV() {
    return this.formSubBaseIV.get('fracturada').value;
  }

  set fracturadaIV(estado: boolean) {
    this.formSubBaseIV.patchValue({
      fracturada: estado,
    });
  }

  get ApareceSubBases() {
    return this.formBases.get('boton').value;
  }
}
