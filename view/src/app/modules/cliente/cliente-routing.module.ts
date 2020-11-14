import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarClienteComponent } from './pages/adicionar-cliente/adicionar-cliente.component';
import { ClienteComponent } from './pages/cliente.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: '',
        component: ListarClientesComponent
      },
      {
        path: 'listar',
        component: ListarClientesComponent
      },
      {
        path: 'adicionar',
        component: AdicionarClienteComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }