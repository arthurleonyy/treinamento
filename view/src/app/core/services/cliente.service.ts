import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private controller = 'clientes';

  constructor(private apiService: ApiService) { }

  adicionarCliente(obj: Cliente) {
    return this.apiService.post(`${this.controller}/`, obj);
  }

  buscarClientes(){
    return this.apiService.get(`${this.controller}/`);
  }

}