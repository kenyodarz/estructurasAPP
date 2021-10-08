// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { EstructuraService } from 'src/app/core/services/estructura.service';
// Modelos
import { Estructura } from 'src/app/core/models/estructura';

@Component({
  selector: 'app-estructuras',
  templateUrl: './estructuras.component.html',
  styleUrls: ['./estructuras.component.css'],
})
export class EstructurasComponent implements OnInit {
  estructura: Estructura = new Estructura();
  selectedEstructura: Estructura = null;
  estructuras: Estructura[] = [];
  formEstructura: FormGroup;
  displaySaveEditModal: boolean = false;
  stateOptions: any[];

  items: MenuItem[] = [];
  title: string = '';

  constructor(
    private estructuraService: EstructuraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  obtenerEstructuras() {
    this.estructuraService.getAll().subscribe((array: Estructura[]) => {
      let estructuras: Estructura[] = [];
      array.forEach((estructura) => {
        estructuras.push(estructura);
      });
      this.estructuras = estructuras.sort(function (a, b) {
        if (a.numEstructura > b.numEstructura) {
          return 1;
        }
        if (a.numEstructura < b.numEstructura) {
          return -1;
        }
        return 0;
      });
      console.log(this.estructuras);
    });
  }

  guardarEstructura() {
    this.estructuraService
      .save(this.estructura)
      .subscribe((estructura: Estructura) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: `Se ha guardado la estructura ${estructura.numEstructura} correctamente`,
        });
        this.validarEstructura(estructura);
        this.displaySaveEditModal = false;
      });
  }

  validarEstructura(estructura: Estructura) {
    let index = this.estructuras.findIndex(
      (e) => e.idEstructura === estructura.idEstructura
    );
    if (index !== -1) {
      this.estructura[index] = estructura;
    } else {
      this.estructuras.push(estructura);
    }
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formEstructura.reset();
    if (editar) {
      if (
        this.selectedEstructura != null &&
        this.selectedEstructura.idEstructura != null
      ) {
        this.title = 'Editar';
        this.formEstructura.patchValue(this.selectedEstructura);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar una Estructura a Editar.',
        });
        return;
      }
    } else {
      this.title = 'Nueva';
      this.estructura = new Estructura();
    }
    this.displaySaveEditModal = true;
  }

  eliminarEstructura() {
    if (
      this.selectedEstructura === null ||
      this.selectedEstructura.idEstructura === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar una Estructura a Eliminar.',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar esta estructura?',
      accept: () => {
        this.estructuraService
          .delete(this.selectedEstructura.idEstructura)
          .subscribe((estructura: Estructura) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Información',
              detail: `La estructura ${estructura.idEstructura} ha sido eliminada correctamente`,
            });
            this.validarEliminacion(estructura);
          });
      },
    });
  }
  
  validarEliminacion(estructura: Estructura) {
    this.estructuras.splice(
      this.estructuras.findIndex(
        (e) => e.idEstructura === estructura.idEstructura
      ),
      1
    );
  }

  onGuardar() {
    this.estructura = this.formEstructura.value;
    this.guardarEstructura();
  }

  ngOnInit(): void {
    this.obtenerEstructuras();
    this.formEstructura = this.fb.group({
      idEstructura: new FormControl(),
      numEstructura: new FormControl(null, Validators.required),
      circuito: new FormControl(null, Validators.required),
      ubicacion: new FormControl(null, Validators.required),
      predioPublico: new FormControl(null, Validators.required),
      coordinadaX: new FormControl(null, Validators.required),
      coordinadaY: new FormControl(null, Validators.required),
      alturaSobreNivelMar: new FormControl(null, Validators.required),
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
        command: () => this.eliminarEstructura(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerEstructuras(),
      },
    ];
    this.stateOptions = [
      { label: 'Publico', value: true },
      { label: 'Privado', value: false },
    ];
  }
}
