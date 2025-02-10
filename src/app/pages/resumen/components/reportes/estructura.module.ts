import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { EstructurasMalasComponent } from './estructuras-malas/estructuras-malas.component';
import { EstructuraRoutingModule } from './estructura-routing.module';

@NgModule({
  declarations: [EstructurasMalasComponent],
  imports: [
    EstructuraRoutingModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EstructuraModule {}
