import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './layouts/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
<<<<<<< HEAD
import { PaginaSemAutorizacaoComponent } from './layouts/pages/pagina-sem-autorizacao/pagina-sem-autorizacao.component';
=======
>>>>>>> origin/develop

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule'
<<<<<<< HEAD
  },{
=======
  },
  {
>>>>>>> origin/develop
    path: 'conta',
    loadChildren: './modules/conta/conta.module#ContaModule'
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  },
<<<<<<< HEAD
  {
    path: 'sem-permissao',
    component: PaginaSemAutorizacaoComponent
  },
=======
>>>>>>> origin/develop
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
