import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeolocationComponent } from './geolocalizacion/geolocalizacion.component';
import { Inicio } from './inicio/inicio';
import {Religiones} from './religiones/religiones'
import {Guerras} from './guerras/guerras'

const encaminaments: Routes = [
  { path: '', redirectTo: '/salutacio', pathMatch: 'full' },
  { path: 'salutacio', component: Inicio },
  { path: 'geolocalizacion', component: GeolocationComponent },
  { path: 'religiones', component: Religiones },
  { path: 'guerras', component: Guerras },
];

@NgModule({
  imports: [RouterModule.forRoot(encaminaments)],
  exports: [RouterModule]
})
export class AppEncaminamentModule { }

