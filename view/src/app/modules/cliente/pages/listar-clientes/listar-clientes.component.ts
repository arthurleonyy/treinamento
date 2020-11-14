import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
    public router: Router
  ) { }

  ngOnInit() {
    this.listarClientes();
  }

  listarClientes(){
    this.clienteService.buscarClientes().subscribe(

      response => {
        this.clientes = response.body
      },
      erro =>{
        SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });
      }
    );
  }

}
