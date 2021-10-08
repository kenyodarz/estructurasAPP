import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { EstructurasBuenasComponent } from './estructuras-buenas/estructuras-buenas.component';
import { ReporteRoutingModule } from './reporte-routing.module';  
import { CableConductorComponent } from './cable-conductor/cable-conductor.component';
import { EstructuraaComponent } from './estructuraa/estructuraa.component';
import { BasesComponent } from './bases/bases.component';
import { AislamientoComponent } from './aislamiento/aislamiento.component';



@NgModule({
  declarations: [
   EstructurasBuenasComponent,
   CableConductorComponent,
   EstructuraaComponent,
   BasesComponent,
   AislamientoComponent,
  ],
  imports: [
   ReporteRoutingModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReporteModule {}
