import { Injectable } from '@angular/core';
import { Conta } from '../models/conta.model';
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

  transferir(obj: Transferencia) {
    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

  consultarSaldo(agencia: string, numConta: string){
    return this.apiService.get(`${this.controller}/consultar-saldo/${agencia}/{numeroConta}?numeroConta=${numConta}`);
  
  }

  listarContas(){
    return this.apiService.get(`${this.controller}`);
  }

}
