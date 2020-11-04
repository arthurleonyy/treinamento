import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './layouts/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaSemAutorizacaoComponent } from './layouts/pages/pagina-sem-autorizacao/pagina-sem-autorizacao.component';
import { DepositarComponent } from './modules/conta/components/depositar/depositar.component';
import { SacarComponent } from './modules/conta/components/sacar/sacar.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'conta',
    loadChildren: './modules/conta/conta.module#ContaModule'
   
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
