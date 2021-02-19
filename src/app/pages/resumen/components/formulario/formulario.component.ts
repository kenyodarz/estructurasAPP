import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
//Modelos
import { Formulario } from 'src/app/core/models/formulario';
// Services
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  items: MenuItem[];
  title: string = '';

  formulario: Formulario = new Formulario();
  selectedFormulario: Formulario = null;
  formularios: Formulario[] = [];
  formFormulario: FormGroup;
  displaySaveEditModal: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  obtenerFormularios() {
    this.formularioService.getAll().subscribe((Array: Formulario[]) => {
      let formularios: Formulario[] = [];
      Array.forEach((formulario) => {
        formularios.push(formulario);
      });
      this.formularios = this.formularios.sort(function (a, b) {
        if (a.idInspeccion > b.idInspeccion) {
          return 1;
        }
        if (a.idInspeccion < b.idInspeccion) {
          return -1;
        }
        return 0;
      });
      console.log(this.formularios);
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
    } else {
      this.formularios.push(formulario);
    }
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
      this.title = 'Nueva';
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
    this.formulario = this.formFormulario.value;
    this.guardarFormulario();
  }

  ngOnInit(): void {
   this.obtenerFormularios();
   this.formFormulario = this.fb.group({
     idInspeccion: new FormControl(null, Validators.required),
     estructura: new FormControl(null, Validators.required),
     idApantallamiento: new FormControl(null, Validators.required),
     idTorres: new FormControl(null, Validators.required),
     idCableConductor: new FormControl(null, Validators.required),
     idAisladores: new FormControl(null, Validators.required),
     idBases: new FormControl(null, Validators.required),
     idSpt: new FormControl(null, Validators.required),
     idServidumbre: new FormControl(null, Validators.required),
     idtransposicion: new FormControl(null, Validators.required),
     idUbicacion: new FormControl(null, Validators.required),
     observaciones: new FormControl(null, Validators.required),
     nombre1: new FormControl(null, Validators.required),
     nombre2: new FormControl(null, Validators.required),
     nombre3: new FormControl(null, Validators.required),
     nombre4: new FormControl(null, Validators.required),
     nombre5: new FormControl(null, Validators.required),
     codigo1: new FormControl(null, Validators.required),
     codigo2: new FormControl(null, Validators.required),
     codigo3: new FormControl(null, Validators.required),
     codigo4: new FormControl(null, Validators.required),
     codigo5: new FormControl(null, Validators.required),
     fecha: new FormControl(null, Validators.required),
     movil: new FormControl(null, Validators.required),
     reviso: new FormControl(null, Validators.required),
     codigoRevisor: new FormControl(null, Validators.required),
     firma: new FormControl(null, Validators.required),
     fechaRevisor: new FormControl(null, Validators.required),
   });
   this.items = [
     {
       label: 'Nuevo',
       icon: 'pi pi-plus',
       command: () => this.mostrarDialogoGuardar(false),
     },
     {
       label: 'Editar',
       icon: 'pi pi-fw pi-pencil',
       command: () => this.mostrarDialogoGuardar(true),
     },
     {
       label: 'Eliminar',
       icon: 'pi pi-fw pi-trash',
       command: () => this.eliminarFormulario(),
     },
     {
       label: 'Actualizar',
       icon: 'pi pi-fw pi-refresh',
       command: () => this.obtenerFormularios(),
     },
   ];
  }
}
