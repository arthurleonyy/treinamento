import { Injectable } from '@angular/core';
import { Conta } from '../models/conta.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private controller = 'conta';

  constructor(private apiService: ApiService) { }

  extratoSaldo(dto: Conta, operacao: string) {
    operacao = operacao.toLowerCase();
    if (operacao === 'extrato') {
      return this.apiService.get(`${this.controller}/consultar-extrato/${dto.agencia}&${dto.numeroConta}`);
    } else if (operacao === 'saldo') {
      return this.apiService.get(`${this.controller}/consultar-saldo/${dto.agencia}&${dto.numeroConta}`);
    }
  }

}
