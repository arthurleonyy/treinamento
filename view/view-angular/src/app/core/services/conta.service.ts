import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private baseUrl = 'contas';

  constructor(private apiService: ApiService) { }

  public depositar(conta: Conta): Observable<Conta> {
    return this.apiService.post(`${this.baseUrl}/deposito`, conta);
  }

  public sacar(conta: Conta): Observable<Conta> {
    return this.apiService.post(`${this.baseUrl}/saque`, conta);
  }

  public consultarSaldo(conta: Conta) {
    return this.apiService.get(`${this.baseUrl}/consultar-saldo/${conta.agencia}/${conta.numeroConta}`);
  }

}
