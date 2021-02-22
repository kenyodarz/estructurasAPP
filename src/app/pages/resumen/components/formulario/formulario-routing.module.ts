import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ApantallamientoComponent } from './apantallamiento/apantallamiento.component';
import { VerFormularioComponent } from './ver-formulario/ver-formulario.component';

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
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FormularioRoutingModule {}
