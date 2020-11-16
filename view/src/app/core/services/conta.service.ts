import { Injectable } from '@angular/core';
import { Conta } from '../models/conta.model';
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

  transferir(obj: Transferir) {
    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

  consultarSaldo(agencia: String, numeroConta: String){
    return this.apiService.get(`${this.controller}/consultar-saldo/${agencia}/${numeroConta}`);
  }

}
