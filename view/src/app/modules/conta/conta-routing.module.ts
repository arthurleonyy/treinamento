import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaComponent } from './conta.component';
import { DepositoComponent } from './deposito/deposito.component';
import { SaqueComponent } from './saque/saque.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
        { path: 'deposito', component: DepositoComponent},
        { path: 'saque', component: SaqueComponent},
        { path: 'transferencia', component: TransferenciaComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }