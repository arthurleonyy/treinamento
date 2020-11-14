import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { Cliente } from '../models/cliente-model';
import { Conta } from '../models/conta.model';
import { Saldo } from '../models/saldo.model';
import { Transferencia } from '../models/transferencia.model';
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

  transferir(obj:Transferencia){
    return this.apiService.post( `${this.controller}/transferir`, obj);
  }
  saldo(obj: Conta){
    return this.apiService.get( `${this.controller}/saldo/${obj.agencia}/${obj.numeroConta}`);
  }
  contas(obj:Cliente){
    return this.apiService.get( `${this.controller}/consultar-contas-cliente/${obj.cpf}`)
  }
}
