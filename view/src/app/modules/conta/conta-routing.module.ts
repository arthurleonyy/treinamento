<<<<<<< HEAD
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { ContaComponent } from './conta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

=======
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
>>>>>>> origin/develop

const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
      {
<<<<<<< HEAD
        path: 'transferencia',
        component: TransferenciaComponent,
      }
=======
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
>>>>>>> origin/develop
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
export class ContaRoutingModule { }
=======
export class ContaRoutingModule { }
>>>>>>> origin/develop
