import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ContaService } from 'src/app/core/services/conta.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaComponent } from './components/conta/conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { ContaPageComponent } from './pages/conta-page.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

@NgModule({
  declarations: [
    ContaPageComponent,
    DepositarSacarComponent,
    OperacoesComponent,
    TransferirComponent,
    ContaComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    SharedModule.forRoot(),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ContaService,
  ],
})
export class ContaModule { }
