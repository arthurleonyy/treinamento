import { Contas } from './../models/conta-cliente.model';
import { Conta } from 'src/app/core/models/conta.model';
import { Injectable } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';
import { ApiService } from './api.service';
import { Extrato } from '../models/extrato.model';

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

  transferir(obj: Transferencia){
    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

  saldo(obj: Conta){
    return this.apiService.get(`${this.controller}/consultar-saldo/${obj.agencia}/${obj.numeroConta}`);
  }

  conta(obj: Contas){
    return this.apiService.get(`${this.controller}/consultar-contas-cliente/${obj.cpf}`);
  }

  extrato(obj: Extrato){
    return this.apiService.get(`${this.controller}/extrato/${obj.agencia}/{numeroConta}?numeroConta=${obj.numeroConta}`);
  }

}
