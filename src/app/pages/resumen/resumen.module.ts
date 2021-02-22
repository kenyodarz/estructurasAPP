import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { ResumenRoutingModule } from './resumen-routing.module';
import { ResumenComponent } from './resumen.component';
import { HomeComponent } from './components/home/home.component';
import { EstructurasComponent } from './components/estructuras/estructuras.component';
import { PersonaComponent } from './components/persona/persona.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { VerFormularioComponent } from './components/formulario/ver-formulario/ver-formulario.component';
import { EstructuraaComponent } from './components/estructuraa/estructuraa.component';
import { AislamientoComponent } from './components/aislamiento/aislamiento.component';
import { ApantallamientoComponent } from './components/apantallamiento/apantallamiento.component';
import { BasesComponent } from './components/bases/bases.component';
import { CableConductorComponent } from './components/cable-conductor/cable-conductor.component';
import { ServidumbreComponent } from './components/servidumbre/servidumbre.component';
import { SptComponent } from './components/spt/spt.component';
import { TransposicionComponent } from './components/transposicion/transposicion.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { InformacionComponent } from './components/informacion/informacion.component';


@NgModule({
  declarations: [
    ResumenComponent,
    HomeComponent,
    EstructurasComponent,
    PersonaComponent,
    FormularioComponent,
    VerFormularioComponent,
    EstructuraaComponent,
    AislamientoComponent,
    ApantallamientoComponent,
    BasesComponent,
    CableConductorComponent,
    ServidumbreComponent,
    SptComponent,
    TransposicionComponent,
    UbicacionComponent,
    InformacionComponent,
  ],
  imports: [
    CommonModule,
    ResumenRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ResumenModule {}
