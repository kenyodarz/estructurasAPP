// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { PersonaService } from 'src/app/core/services/persona.service';
// Model
import { Persona } from 'src/app/core/models/persona';

@Component({
  selector: 'app-home',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  personaList: Persona[] = [];
  persona: Persona = new Persona();
  selectedPersona: Persona = null;
  formPersona: UntypedFormGroup;

  value3: string;
  displaySaveEditModal: Boolean = false;
  items: MenuItem[] = [];
  title: string = '';
  estadoActivo: any[];
  isAdmin: any[];

  constructor(
    private personaService: PersonaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder
  ) {}

  obtenerPersonas(): void {
    this.personaService.getAll().subscribe(
      (array: Persona[]) => {
        let personas: Persona[] = [];
        array.forEach((persona) => {
          personas.push(persona);
        });
        this.personaList = personas.sort(function (a, b) {
          if (a.cedulaPersona > b.cedulaPersona) {
            return 1;
          }
          if (a.cedulaPersona < b.cedulaPersona) {
            return -1;
          }
          return 0;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarPersona() {
    this.personaService.save(this.persona).subscribe((persona: Persona) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Resultado',
        detail: `La persona ${persona.nombrePersona} ${persona.apellidoPersona} ha sido guardada correctamente`,
      });
      this.validarGuardado(persona);
      this.displaySaveEditModal = false;
    });
  }

  validarGuardado(entity: Persona) {
    let index = this.personaList.findIndex(
      (e) => e.cedulaPersona === entity.cedulaPersona
    );
    if (index != -1) {
      this.personaList[index] = entity;
    } else {
      this.personaList.push(entity);
    }
  }

  mostarDialigoGuardarEditar(editar: boolean) {
    this.formPersona.reset();
    if (editar) {
      if (
        this.selectedPersona === null ||
        this.selectedPersona.cedulaPersona === null
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar una Persona a Editar.',
        });
        return;
      } else {
        this.title = 'Editar';
        this.formPersona.patchValue(this.selectedPersona);
      }
    } else {
      this.persona = new Persona();
      this.title = 'Nueva';
    }
    this.displaySaveEditModal = true;
  }

  eliminarPersona() {
    if (
      this.selectedPersona === null ||
      this.selectedPersona.cedulaPersona === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar una Persona a Eliminar.',
      });
      return;
    }
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar a ${this.selectedPersona.nombrePersona}?`,
      accept: () => {
        this.personaService
          .delete(this.selectedPersona.cedulaPersona)
          .subscribe((persona: Persona) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Información',
              detail: `La persona ${persona.nombrePersona} ${persona.apellidoPersona}  ha sido eliminada correctamente`,
            });
          });
        this.validarEliminacion(this.persona);
      },
    });
  }
  validarEliminacion(persona: Persona) {
    this.personaList.splice(
      this.personaList.findIndex(
        (e) => e.cedulaPersona === persona.cedulaPersona
      ),
      1
    );
  }

  onGuardar() {
    this.persona = this.formPersona.value;
    this.guardarPersona();
  }

  ngOnInit(): void {
    this.obtenerPersonas();
    this.formPersona = this.fb.group({
      cedulaPersona: new UntypedFormControl(null, Validators.required),
      nombrePersona: new UntypedFormControl(null, Validators.required),
      apellidoPersona: new UntypedFormControl(null, Validators.required),
      telefonoPersona: new UntypedFormControl(null, Validators.required),
      usuario: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required),
      estadoActivo: new UntypedFormControl(null, Validators.required),
      esAdministrador: new UntypedFormControl(null, Validators.required),
    });
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-plus',
        command: () => this.mostarDialigoGuardarEditar(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.mostarDialigoGuardarEditar(true),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => this.eliminarPersona(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerPersonas(),
      },
    ];

    this.estadoActivo = [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ];

    this.isAdmin = [
      { label: 'Administrativo', value: true },
      { label: 'Operativo', value: false },
    ];
  }
}
