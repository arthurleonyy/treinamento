import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ContaComponent } from './conta.component';
import { DepositoComponent} from './deposito.component';
const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
  },

  { path: 'deposito', component:DepositoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }