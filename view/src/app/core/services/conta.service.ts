import { Injectable } from '@angular/core';
import { Conta } from '../models/conta.model';
import { ApiService } from './api.service';
import { ContaTransferencia } from '../models/conta.model';
import { ContaSaldo } from '../models/conta.model';


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

  transferencia(obj: ContaTransferencia) {
    return this.apiService.post(`${this.controller}/transferencia`, obj);
    }

  saldo(obj: ContaSaldo) {
    return this.apiService.get(`${this.controller}/consultar-saldo/${obj.agencia}/{numeroConta}?numeroConta=${obj.numeroConta}`);
    }  

}
