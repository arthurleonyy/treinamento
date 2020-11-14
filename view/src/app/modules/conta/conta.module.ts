import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ContaService } from 'src/app/core/services/conta.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { ContasComponent } from './components/contas/contas.component';

@NgModule({
  declarations: [
    ContaComponent,
    DepositarSacarComponent,
    OperacoesComponent,
    TransferenciaComponent,
    SaldoComponent,
    ContasComponent,
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
