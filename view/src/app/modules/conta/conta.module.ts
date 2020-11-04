import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { DepositarComponent } from './depositar/depositar.component';
import { ContaRoutingModule } from './conta-routing.module';



@NgModule({
  declarations: [ContaComponent, DepositarComponent],
  imports: [
    CommonModule,
    ContaRoutingModule
  ]
})
export class ContaModule { }
