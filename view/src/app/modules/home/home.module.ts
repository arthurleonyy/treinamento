import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HomeRoutingModule } from './home-routing.module';
import { SobreComponent } from './componentes/sobre/sobre.component';


@NgModule({
  declarations: [
    InicioComponent,
    SobreComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
