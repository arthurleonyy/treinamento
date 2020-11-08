import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HomeRoutingModule } from './home-routing.module';
<<<<<<< HEAD
import { SobreComponent } from './componentes/sobre/sobre.component';


@NgModule({
  declarations: [
    InicioComponent,
    SobreComponent
  ],
=======

@NgModule({
  declarations: [InicioComponent],
>>>>>>> origin/develop
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
