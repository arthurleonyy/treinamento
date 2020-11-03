import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositoComponent } from './components/deposito/deposito.component';
import { ContaComponent } from './conta.component';

const routes: Routes = [
  {
    path: '', component: ContaComponent,
    children: [
      { path: 'deposito', component: DepositoComponent}
      ,]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }