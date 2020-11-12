import { Transferir } from './../models/transferir.model';
import { CoreModule } from 'src/app/core/core.module';
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

  transferir(obj: Transferir){
   return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

}
