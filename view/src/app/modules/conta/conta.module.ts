import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { CoreModule } from 'src/app/core/core.module';
import { ContaService } from 'src/app/core/services/conta.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaRoutingModule } from './conta-routing.module';
import { ConsultaSaldoComponent } from './pages/consulta-saldo/consulta-saldo.component';
import { ConsultarContasComponent } from './pages/consultar-contas/consultar-contas.component';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferirComponent } from './pages/transferir/transferir.component';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    ContaComponent,
    DepositarSacarComponent,
    OperacoesComponent,
    TransferirComponent,
    ConsultaSaldoComponent,
    ConsultarContasComponent,
    ExtratoComponent,
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
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ContaService,
  ],
})
export class ContaModule { }
