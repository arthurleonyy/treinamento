import { ConsultaSaldoComponent } from './pages/consulta-saldo/consulta-saldo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferenciaContaComponent } from './pages/transferencia-conta/transferencia-conta.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';

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
        path: 'sacar',
        component: DepositarSacarComponent
      },
      {
        path: 'transferencia',
        component: TransferenciaContaComponent
      },
      {
        path: 'saldo',
        component: ConsultaSaldoComponent
      },
      {
        path: 'contas',
        component: ContaComponent
      },
    
      {
        path: 'extrato',
        component: ExtratoComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }