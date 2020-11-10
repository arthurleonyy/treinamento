import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './layouts/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
<<<<<<< HEAD
import { PaginaSemAutorizacaoComponent } from './layouts/pages/pagina-sem-autorizacao/pagina-sem-autorizacao.component';
=======
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5

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
