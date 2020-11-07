import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaComponent } from './conta.component';
import { SacarComponent } from './sacar/sacar.component';
import { DepositarComponent } from './depositar/depositar.component';
import { TransferirComponent } from './transferir/transferir.component';

const routes: Routes = [
  {
    path: '',    component: ContaComponent,
    children:[
      {
        path: "depositar", component: DepositarComponent   
      },
      {
        path: "sacar", component: SacarComponent   
      },
      {
        path: "transferir", component: TransferirComponent   
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }