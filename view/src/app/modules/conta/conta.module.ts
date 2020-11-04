import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositarComponent } from './depositar/depositar.component';
import { ContaComponent } from './conta.component';



@NgModule({
  declarations: [DepositarComponent, ContaComponent],
  imports: [
    CommonModule
  ]
})
export class ContaModule { }
