import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferirComponent } from './transferir.component';

const routes: Routes = [
  {
    path: '',
    component: TransferirComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferirRoutingModule { }