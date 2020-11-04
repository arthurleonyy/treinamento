import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { DepositoComponent } from './deposito/deposito.component';
import { ContaRoutingModule } from './conta-routing.module';
import { SaqueComponent } from './saque/saque.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

@NgModule({
  declarations: [
    ContaComponent,
    DepositoComponent,
    SaqueComponent,
    TransferenciaComponent,

  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
  ]
})
export class ContaModule { }
