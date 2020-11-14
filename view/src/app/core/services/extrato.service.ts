import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  private controller = 'extrato';

  constructor(private apiService: ApiService) { }

  findByAgenciaAndNumConta(agencia: string, numeroConta: string){
    return this.apiService.get(`${this.controller}/consultar-extrato-da-conta/${agencia}/{numeroConta}?numeroConta=${numeroConta}`);
  }

}