import { Conta } from '../models/conta.model';
import { Injectable } from '@angular/core';
import { DepositarSacarDTO, TransferirDTO } from '../models/conta.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {

  private controller = 'operacoes';

  constructor(private apiService: ApiService) { }

  depositarSacar(dto: DepositarSacarDTO, operacao: string) {
    operacao = operacao.toLowerCase();
    if (operacao === 'depositar') {
      return this.apiService.put(`${this.controller}/deposito`, dto);
    } else if (operacao === 'sacar') {
      return this.apiService.put(`${this.controller}/saque`, dto);
    }
  }

  transferir(dto: TransferirDTO) {
    return this.apiService.put(`${this.controller}/transferencia`, dto);
  }

}
