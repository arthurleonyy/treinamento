import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositarComponent } from './depositar.component';

const routes: Routes = [
  {
    path: '',
    component: DepositarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositarRoutingModule { }