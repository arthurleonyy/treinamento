import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { SacarComponent } from './sacar/sacar.component';
import { TransferirComponent } from './transferir/transferir.component';
import { DepositarComponent } from './depositar/depositar.component';




@NgModule({
  declarations: [
    
    ContaComponent,
    SacarComponent,
    TransferirComponent,
    DepositarComponent
  
  ],
  imports: [
    CommonModule, 
    ContaRoutingModule
    
  ]
})
export class ContaModule { }
