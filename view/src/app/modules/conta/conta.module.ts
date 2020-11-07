import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { ContaRoutingModule } from './conta-routing.module';


@NgModule({
  declarations: [ContaComponent, DepositoComponent],
  imports: [
    CommonModule,
    ContaRoutingModule,
  ]
})
export class ContaModule { }
