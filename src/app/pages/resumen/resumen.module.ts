import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenRoutingModule } from './resumen-routing.module';
import { ResumenComponent } from './resumen.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [ResumenComponent, HomeComponent],
  imports: [
    CommonModule,
    ResumenRoutingModule
  ]
})
export class ResumenModule { }
