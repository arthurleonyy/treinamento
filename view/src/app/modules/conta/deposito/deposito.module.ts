import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositoComponent } from './deposito.component';
import { DepositoRoutingModule } from './deposito-routing.module';


@NgModule({
  declarations: [
    DepositoComponent,
  ],
  imports: [
    CommonModule,
    DepositoRoutingModule
  ]
})
export class DepositoModule { }
