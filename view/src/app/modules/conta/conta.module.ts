import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { DepositoComponent } from '../deposito/deposito.component';
import { DepositoRoutingModule } from '../deposito/deposito-routing.module';



@NgModule({
  declarations: [
    ContaComponent,
    DepositoComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    DepositoRoutingModule
  ]
})
export class ContaModule { }
