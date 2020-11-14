import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaSaldoComponent } from './pages/consulta-saldo/consulta-saldo.component';
import { ConsultarContasComponent } from './pages/consultar-contas/consultar-contas.component';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

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
        path: 'transferir',
        component: TransferirComponent
      },
      {
        path: 'consulta-saldo',
        component: ConsultaSaldoComponent
      },
      {
        path: 'consultar-contas',
        component: ConsultarContasComponent
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