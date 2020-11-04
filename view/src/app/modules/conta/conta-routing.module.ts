import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaComponent } from './conta.component';
import { DepositarComponent } from './depositar/depositar.component';

const routes: Routes = [
  {
    path: '', component: ContaComponent,
    children:  [
        {path: 'depositar', component: DepositarComponent}
    ],  
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
