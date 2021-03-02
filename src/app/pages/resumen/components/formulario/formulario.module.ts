import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { FormularioRoutingModule } from './formulario-routing.module';
import { InformacionComponent } from './informacion/informacion.component';
import { ApantallamientoComponent } from './apantallamiento/apantallamiento.component';
import { EstructuraaComponent } from './estructuraa/estructuraa.component';
import { AislamientoComponent } from './aislamiento/aislamiento.component';
import { BasesComponent } from './bases/bases.component';
import { SptComponent } from './spt/spt.component';
import { TransposicionComponent } from './transposicion/transposicion.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { VerFormularioComponent } from './ver-formulario/ver-formulario.component';
import { CableConductorComponent } from './cable-conductor/cable-conductor.component';
import { ServidumbreComponent } from './servidumbre/servidumbre.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';


@NgModule({
  declarations: [
    VerFormularioComponent,
    InformacionComponent,
    ApantallamientoComponent,
    EstructuraaComponent,
    AislamientoComponent,
    BasesComponent,
    SptComponent,
    TransposicionComponent,
    UbicacionComponent,
    CableConductorComponent,
    ServidumbreComponent,
    ObservacionComponent,
    ConfirmacionComponent,
  ],
  imports: [
    FormularioRoutingModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormularioModule {}
