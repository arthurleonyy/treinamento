import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';



@NgModule({
  declarations: [
    ContaComponent,
    TransferenciaComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule
  ]
})
export class ContaModule { }
