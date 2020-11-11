import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './conta.component';
import { ContasComponent } from './pages/contas/contas.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';

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
        component: TransferenciaComponent
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
        path: 'extrato',
        component: ExtratoComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }