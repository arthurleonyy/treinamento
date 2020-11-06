import { TransferenciaComponent } from './componenetes/transferencia/transferencia.component';
import { ContaComponent } from './conta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children:[
      {
        path: 'transferencia',
        component: TransferenciaComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
