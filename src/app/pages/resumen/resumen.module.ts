import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { ResumenRoutingModule } from './resumen-routing.module';
import { ResumenComponent } from './resumen.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [ResumenComponent, HomeComponent],
  imports: [
    CommonModule,
    ResumenRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ResumenModule {}
