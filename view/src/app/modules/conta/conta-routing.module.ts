import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaComponent } from './conta.component';
import { DepositarComponent } from './depositar/depositar.component';

const routes: Routes = [
  {
    path: 'depositar',
    component: DepositarComponent,
  },

  {
    path: '',
    component: ContaComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
