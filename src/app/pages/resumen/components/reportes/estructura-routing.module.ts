import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AislamientoComponent } from './aislamiento/aislamiento.component';
import { BasesComponent } from './bases/bases.component';
import { CableConductorComponent } from './cable-conductor/cable-conductor.component';
import { EstructuraaComponent } from './estructuraa/estructuraa.component';
import { EstructurasMalasComponent } from './estructuras-malas/estructuras-malas.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      // { path: '', redirectTo: 'informacion', pathMatch: 'full' },
      {
        path: '',
        component: EstructurasMalasComponent,
        children: [
          //  { path: 'apantallamiento', component: EstructuraaComponent },
           { path: 'estructuraa', component: EstructuraaComponent },
           { path: 'cable-conductor', component: CableConductorComponent },
           { path: 'aislamiento', component: AislamientoComponent },
           { path: 'bases', component: BasesComponent },
          //  { path: 'spt', component: EstructuraaComponent },
          //  { path: 'servidumbre', component: EstructuraaComponent },
          //  { path: 'transposicion', component: EstructuraaComponent },
          //  { path: 'ubicacion', component: EstructuraaComponent },
          
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class EstructuraRoutingModule {}
