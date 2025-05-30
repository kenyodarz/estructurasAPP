import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { HomeComponent } from './components/home/home.component';
import { ResumenComponent } from './resumen.component';
import { PersonaComponent } from './components/persona/persona.component';
import { EstructurasComponent } from './components/estructuras/estructuras.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { VerFormularioComponent } from './components/formulario/ver-formulario/ver-formulario.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: ResumenComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'persona',
        component: PersonaComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'estructuras',
        component: EstructurasComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'reportes/estructurasBuenas',
        loadChildren: () =>
          import(
            'src/app/pages/resumen/components/reportes/reporte.module'
          ).then((m) => m.ReporteModule),
        canActivate: [LoginGuard],
      },

      {
        path: 'reportes/estructurasMalas',
        loadChildren: () =>
          import(
            'src/app/pages/resumen/components/reportes/estructura.module'
          ).then((m) => m.EstructuraModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'formulario',
        component: FormularioComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'formulario/ver/:id',
        loadChildren: () =>
          import(
            'src/app/pages/resumen/components/formulario/formulario.module'
          ).then((m) => m.FormularioModule),
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRoutingModule {}
