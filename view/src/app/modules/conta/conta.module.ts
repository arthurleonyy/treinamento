<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { ContaRoutingModule } from './conta-routing.module';
import { DepositarComponent } from './components/depositar/depositar.component';
=======
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
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5

@NgModule({
  declarations: [
    ContaComponent,
<<<<<<< HEAD
    DepositarComponent,
=======
    DepositarSacarComponent,
    OperacoesComponent,
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
<<<<<<< HEAD
  ]
=======
    SharedModule.forRoot(),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ContaService,
  ],
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
})
export class ContaModule { }
