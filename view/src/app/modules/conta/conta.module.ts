import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { DepositoComponent } from './deposito/deposito.component';


@NgModule({
  declarations: [
    ContaComponent,
    DepositoComponent,
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
  ]
})
export class ContaModule { }
