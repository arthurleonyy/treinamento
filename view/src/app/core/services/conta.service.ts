import { Conta } from 'src/app/core/models/conta.model';
import { Saldo } from './../dtos/saldo.dto';
import { Injectable } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';
import { ApiService } from './api.service';
import { ConsultarContas } from '../dtos/consultar-contas';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private controller = 'contas';

  private controllerExtrato = 'extrato';

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

  saldo(param: Saldo) {
    return this.apiService.get(`${this.controller}/consultar-saldo/${param.agencia}/${param.numeroConta}`);
  }

  consultarContas(obj: ConsultarContas){
     return this.apiService.get(`${this.controller}/consultar-contas-cliente/${obj.cpf}`);
  }

  consultarExtrato(obj: Conta) {
    return this.apiService.get(`${this.controllerExtrato}/visualizar/${obj.agencia}/${obj.numeroConta}`);
  }

}
