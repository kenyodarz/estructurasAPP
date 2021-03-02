import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ApantallamientoComponent } from './apantallamiento/apantallamiento.component';
import { EstructuraaComponent } from './estructuraa/estructuraa.component';
import { CableConductorComponent } from './cable-conductor/cable-conductor.component';
import { AislamientoComponent } from './aislamiento/aislamiento.component';
import { BasesComponent } from './bases/bases.component';
import { SptComponent } from './spt/spt.component';
import { ServidumbreComponent } from './servidumbre/servidumbre.component';
import { TransposicionComponent } from './transposicion/transposicion.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { VerFormularioComponent } from './ver-formulario/ver-formulario.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      // { path: '', redirectTo: 'informacion', pathMatch: 'full' },
      {
        path: '',
        component: VerFormularioComponent,
        children: [
          { path: 'informacion/:id', component: InformacionComponent },
          { path: 'apantallamiento/:id', component: ApantallamientoComponent },
          { path: 'estructuraa/:id', component: EstructuraaComponent },
          { path: 'cable-conductor/:id', component: CableConductorComponent },
          { path: 'aislamiento/:id', component: AislamientoComponent },
          { path: 'bases/:id', component: BasesComponent },
          { path: 'spt/:id', component: SptComponent },
          { path: 'servidumbre/:id', component: ServidumbreComponent },
          { path: 'transposicion/:id', component: TransposicionComponent },
          { path: 'ubicacion/:id', component: UbicacionComponent },
          { path: 'observacion/:id', component: ObservacionComponent },
          { path: 'confirmacion/:id', component: ConfirmacionComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FormularioRoutingModule {}
