import { SaldoComponent } from './pages/saldo/saldo.component';


import { TransferirComponent } from './pages/transferir/transferir.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { ContasComponent } from './pages/contas/contas.component';



const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
      {
        path: '',
        component: OperacoesComponent
      },
      {
        path: 'operacoes',
        component: OperacoesComponent
      },
      {
        path: 'depositar',
        component: DepositarSacarComponent
      },

      {
        path: 'saldo',
        component: SaldoComponent
      },

      {
        path: 'contas',
        component: ContasComponent
      },
      {
        path: 'sacar',
        component: DepositarSacarComponent
      },
      
      {
      path: 'transferir',
      component: TransferirComponent
    },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }