import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ContaService } from 'src/app/core/services/conta.service';
import { OperacoesService } from 'src/app/core/services/operacoes.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormContaComponent } from './components/form/conta/form-conta.component';
import { FormValorComponent } from './components/form/valor/form-valor.component';
import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { ExtratoSaldoComponent } from './pages/extrato-saldo/extrato-saldo.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

@NgModule({
  declarations: [
    ContaComponent,
    DepositarSacarComponent,
    OperacoesComponent,
    TransferirComponent,
    FormContaComponent,
    FormValorComponent,
    ExtratoSaldoComponent,
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
    OperacoesService,
    ContaService,
  ],
})
export class ContaModule { }
