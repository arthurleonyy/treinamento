import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositarComponent } from './components/depositar/depositar.component';
import { SacarComponent } from './components/sacar/sacar.component';
import { TransferirComponent } from './components/transferir/transferir.component';
import { ContaComponent } from './conta.component';

const routes: Routes = [
  {
    path: '', component: ContaComponent,
    children: [
      {
        path: 'depositar',
        component: DepositarComponent
      },
      {
        path: 'sacar',
        component: SacarComponent
      },{
        path: 'transferir',
        component: TransferirComponent
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
