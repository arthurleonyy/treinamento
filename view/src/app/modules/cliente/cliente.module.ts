import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './pages/cliente.component';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ClienteRoutingModule } from '../cliente/cliente-routing.module'
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { AdicionarClienteComponent } from './pages/adicionar-cliente/adicionar-cliente.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ListarClientesComponent,
    AdicionarClienteComponent, 
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule.forRoot(),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClienteService,
  ]
})
export class ClienteModule { }
