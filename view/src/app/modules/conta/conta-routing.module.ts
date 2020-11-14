import { ExtratoComponent } from './pages/extrato/extrato.component';
import { ConsultasContasComponent } from './pages/consultas-contas/consultas-contas.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';



const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
      {

        path: 'transferencia',
        component: TransferenciaComponent,
      },
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
        path: 'saldo',
        component: SaldoComponent
      },
      {
        path: 'conta',
        component: ConsultasContasComponent
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

