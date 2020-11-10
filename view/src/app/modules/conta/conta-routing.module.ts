import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { DepositarComponent } from './components/depositar/depositar.component';
import { ContaComponent } from './conta.component';
=======
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5

const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
      {
<<<<<<< HEAD
        path: 'depositar',
        component: DepositarComponent
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
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
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
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
