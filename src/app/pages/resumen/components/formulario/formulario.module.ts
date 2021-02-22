import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { InformacionComponent } from '../informacion/informacion.component';

import { FormularioRoutingModule } from './formulario-routing.module';

@NgModule({
  declarations: [InformacionComponent],
  imports: [
    FormularioRoutingModule, PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormularioModule {}
