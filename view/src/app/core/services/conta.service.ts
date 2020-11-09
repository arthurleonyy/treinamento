
import { ContaTransferir, Saldo } from './../models/conta.model';
import { Injectable } from '@angular/core';
import { Conta } from '../models/conta.model';
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

  transferir(obj: ContaTransferir) {
    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

  saldo(obj: Saldo) {
    return this.apiService.get(`${this.controller}/saldo`,);
  }

}
