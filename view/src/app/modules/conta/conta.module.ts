import { ConsultaSaldoComponent } from './pages/consulta-saldo/consulta-saldo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ContaService } from 'src/app/core/services/conta.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { TransferenciaContaComponent } from './pages/transferencia-conta/transferencia-conta.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';

@NgModule({
  declarations: [
    ContaComponent,
    DepositarSacarComponent,
    TransferenciaContaComponent,
    OperacoesComponent,
    ConsultaSaldoComponent
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
