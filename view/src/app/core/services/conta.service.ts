import { Injectable } from '@angular/core';
import { SaldoComponent } from 'src/app/modules/conta/pages/saldo/saldo.component';
import { Conta } from '../models/conta.model';
import { Saldo } from '../models/saldo.model';
import { Transferir } from '../models/transferir.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private controller = 'contas';

  constructor(private apiService: ApiService) { }

  depositar(obj: Conta) {
    return this.apiService.post(`${this.controller}/deposito`, obj);
  }

  sacar(obj: Conta) {
    return this.apiService.post(`${this.controller}/saque`, obj);
  }

  transferir(obj: Transferir){
    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }
 
  consultarSaldo (obj: Saldo) {
    return this.apiService.get(`${this.controller}/consultar-saldo/${obj.agencia}/${obj.numeroConta}`);
  }

  consultarContas(cpf: String){
    return this.apiService.get(`${this.controller}/consultar-contas-cliente/${cpf}`)
  }

}
