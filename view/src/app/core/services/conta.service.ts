
import { Transferencia } from '../models/transferencia.model'
import { Injectable } from '@angular/core';
import { Conta } from '../models/conta.model';
import { ApiService } from './api.service';
import { ConsultarContas } from '../models/consultar-contas.model';
import { ConsultarExtrato } from '../models/extrato.model';


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

  transferir(obj: Transferencia) {

    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

  saldo(obj: Conta) {

    return this.apiService.get(`${this.controller}/consultar-saldo/${obj.agencia}/${obj.numeroConta}`);
  }

  consultarContas(obj: ConsultarContas) {

    return this.apiService.get(`${this.controller}/consultar-contas-cliente/${obj.cpf}`);
  }
  extrato(obj: ConsultarExtrato) {

    return this.apiService.get(`movimentocontas/consulta-extrato/${obj.agencia}/{numeroConta}?numeroConta=${obj.numeroConta}`);

  }


}
