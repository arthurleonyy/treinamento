import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SacarComponent } from './sacar.component';

const routes: Routes = [
  {
    path: '',
    component: SacarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SacarRoutingModule { }