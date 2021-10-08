import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
//Modelos
import { Formulario } from 'src/app/core/models/formulario';
import { Persona } from 'src/app/core/models/persona';
// Services
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  formulario: Formulario = new Formulario();
  selectedFormulario: Formulario = null;
  formularios: Formulario[] = [];
  persona: Persona;
  formFormulario: FormGroup;

  title: string = '';
  displaySaveEditModal: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private personaService: PersonaService,
    private token: TokenStorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerFormularios() {
    this.formularioService.getAll().subscribe((Array: Formulario[]) => {
      let formularios: Formulario[] = [];
      Array.forEach((formulario) => {
        formularios.push(formulario);
      });
      this.formularios = formularios.sort(function (a, b) {
        if (a.numeroOT > b.numeroOT) {
          return 1;
        }
        if (a.numeroOT < b.numeroOT) {
          return -1;
        }
        return 0;
      });
      console.log(this.formularios);
    });
  }

  obtenerPersona(persona: Persona) {
    this.personaService
      .getOne(persona.cedulaPersona)
      .subscribe((result: Persona) => {
        return (this.persona = result);
      });
  }

  guardarFormulario() {
    this.formularioService
      .save(this.formulario)
      .subscribe((formulario: Formulario) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: `Se ha guardado el formato ${formulario.idInspeccion} correctamente`,
        });
        this.validarFormulario(formulario);
        this.displaySaveEditModal = false;
      });
  }

  validarFormulario(formulario: Formulario) {
    let index = this.formularios.findIndex(
      (e) => e.idInspeccion === formulario.idInspeccion
    );
    if (index !== -1) {
      this.formulario[index] = formulario;
      
            this.messageService.add({
              severity: 'info',
              summary: 'Información',
              detail: `El formato ha sido eliminada correctamente`,
            });
        
    } else {
      this.formularios.push(formulario);

    }
    this.onVerFormulario(formulario);
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formFormulario.reset();
    if (editar) {
      if (
        this.selectedFormulario != null &&
        this.selectedFormulario.idInspeccion != null
      ) {
        this.title = 'Editar';
        this.formFormulario.patchValue(this.selectedFormulario);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar una Formato a Editar.',
        });
        return;
      }
    } else {
      this.title = 'Nuevo';
      this.formFormulario.patchValue({
        persona: this.persona,
      });
      this.formulario = new Formulario();
    }
    this.displaySaveEditModal = true;
  }

  eliminarFormulario() {
    if (
      this.selectedFormulario === null ||
      this.selectedFormulario.idInspeccion === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un formato a Eliminar.',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este formato?',
      accept: () => {
        this.formularioService
          .delete(this.selectedFormulario.idInspeccion)
          .subscribe((formulario: Formulario) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Información',
              detail: `El formato ${formulario.idInspeccion} ha sido eliminada correctamente`,
            });
            this.validarEliminacion(formulario);
          });
      },
    });
  }
  validarEliminacion(formulario: Formulario) {
    this.formularios.splice(
      this.formularios.findIndex(
        (e) => e.idInspeccion === formulario.idInspeccion
      ),
      1
    );
  }

  onGuardar() {
    this.formFormulario.patchValue({
      persona: this.persona,
    });
    this.formulario = this.formFormulario.value;
    console.info(this.formulario);
    this.guardarFormulario();
  }

  onVerFormulario(formulario: Formulario) {
    console.log(formulario);
    this.router.navigateByUrl('resumen/formulario/ver/' + formulario.idInspeccion);
  }

  ngOnInit(): void {
    this.obtenerFormularios();
    this.obtenerPersona(this.token.obtenerUsuario());
    this.formFormulario = this.fb.group({
      idInspeccion: new FormControl(),
      estructura: new FormControl(),
      idApantallamiento: new FormControl(),
      idTorres: new FormControl(),
      idCableConductor: new FormControl(),
      idAisladores: new FormControl(),
      idBases: new FormControl(),
      idSpt: new FormControl(),
      idServidumbre: new FormControl(),
      idtransposicion: new FormControl(),
      idUbicacion: new FormControl(),
      numeroOT: new FormControl(null, Validators.required),
      observaciones: new FormControl(),
      persona: new FormControl(null, Validators.required),
      nombre2: new FormControl(),
      nombre3: new FormControl(),
      nombre4: new FormControl(),
      nombre5: new FormControl(),
      codigo1: new FormControl(),
      codigo2: new FormControl(),
      codigo3: new FormControl(),
      codigo4: new FormControl(),
      codigo5: new FormControl(),
      fecha: new FormControl(),
      movil: new FormControl(),
      reviso: new FormControl(),
      codigoRevisor: new FormControl(),
      firma: new FormControl(),
      fechaRevisor: new FormControl(),
    });
  }
}
