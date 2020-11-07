import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { PaginaNaoEncontradaComponent } from './layouts/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaSemAutorizacaoComponent } from './layouts/pages/pagina-sem-autorizacao/pagina-sem-autorizacao.component';
import { DepositarComponent } from './modules/conta/depositar/depositar.component';
import { ContaComponent } from './modules/conta/conta/conta.component';

const routes: Routes = [
    {
      path: "",
      component: AppComponent
    },
  
    {
      path: "conta",
      component: ContaComponent
  },
  
  {
      path: "conta/depositar",
      component: DepositarComponent
  },
  
    {
      path: '**',
      component: PaginaNaoEncontradaComponent
    },
    {
      path: 'sem-permissao',
      component: PaginaSemAutorizacaoComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
