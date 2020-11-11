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
import { TransferirComponent } from './pages/transferir/transferir.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { ConsultarcontasComponent } from './pages/consultarcontas/consultarcontas.component';

@NgModule({
  declarations: [
    ContaComponent,
    DepositarSacarComponent,
    OperacoesComponent,
    TransferirComponent,
    SaldoComponent,
    ConsultarcontasComponent,
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
