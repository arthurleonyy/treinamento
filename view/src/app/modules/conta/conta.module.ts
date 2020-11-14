import { ConsultasContasComponent } from './pages/consultas-contas/consultas-contas.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
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
import { ExtratoComponent } from './pages/extrato/extrato.component';



@NgModule({
  declarations: [
    ContaComponent,
    DepositarSacarComponent,
    OperacoesComponent,
    TransferenciaComponent,
    ExtratoComponent,
    SaldoComponent,
    ConsultasContasComponent,
    ExtratoComponent
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
