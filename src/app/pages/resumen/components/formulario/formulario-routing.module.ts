import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstructurasComponent } from '../estructuras/estructuras.component';
import { InformacionComponent } from '../informacion/informacion.component';
import { FormularioComponent } from './formulario.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FormularioComponent,
        children: [
          { path: '', redirectTo: 'informacion', pathMatch: 'full' },
          { path: 'informacion', component: InformacionComponent },
          
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FormularioRoutingModule {}
