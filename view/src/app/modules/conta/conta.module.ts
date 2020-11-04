import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { DepositarComponent } from './components/depositar/depositar.component';
import { SacarComponent } from './components/sacar/sacar.component';
import { TransferirComponent } from './components/transferir/transferir.component';


@NgModule({
  declarations: [
    ContaComponent,
    DepositarComponent,
    SacarComponent,
    TransferirComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule
  ]
})
export class ContaModule { }
