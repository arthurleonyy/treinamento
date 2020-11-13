import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { TransferirDTO } from './../../../../core/models/conta.model';
import { ContaService } from './../../../../core/services/conta.service';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent {

  isFormContaOrigemInvalid = true;
  isFormContaDestinoInvalid = true;
  isFormValorInvalid = true;
  agenciaOrigem: string;
  numeroContaOrigem: string;
  agenciaDestino: string;
  numeroContaDestino: string;
  valor: number;

  constructor(
    private contaService: ContaService,
    public router: Router
  ) { }

  onSubmit() {
    if (!this.isFormContaOrigemInvalid && !this.isFormContaDestinoInvalid && !this.isFormValorInvalid) {
      const transferirDTO = new TransferirDTO({
        agenciaOrigem: this.agenciaOrigem,
        numeroContaOrigem: this.numeroContaOrigem,
        agenciaDestino: this.agenciaDestino,
        numeroContaDestino: this.numeroContaDestino,
        valor: this.valor
      });
      this.transferir(transferirDTO);
    }
  }

  private transferir(transferirDTO: TransferirDTO) {
    this.contaService.transferir(transferirDTO).subscribe(
      response => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', { type: 'success' }).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/operacoes']);
            }
          }
        );
      },
      erro => {
        if (erro.error.detalhes) {
          SweetalertCustom.showAlertConfirm(erro.error.detalhes[0], { type: 'error' });
        } else {
          SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });
        }
      }
    );
  }

  getAgenciaDaContaOrigem(agencia: string) {
    this.agenciaOrigem = agencia;
  }

  getNumeroContaDaContaOrigem(numeroConta: string) {
    this.numeroContaOrigem = numeroConta;
  }

  getAgenciaDaContaDestino(agencia: string) {
    this.agenciaDestino = agencia;
  }

  getNumeroContaDaContaDestino(numeroConta: string) {
    this.numeroContaDestino = numeroConta;
  }

  getValor(valor: number) {
    this.valor = valor;
  }

  getIsFormContaOrigemInvalid(isFormContaInvalid: boolean) {
    this.isFormContaOrigemInvalid = isFormContaInvalid;
  }

  getIsFormContaDestinoInvalid(isFormContaInvalid: boolean) {
    this.isFormContaDestinoInvalid = isFormContaInvalid;
  }

  getIsFormValorInvalid(isFormValorInvalid: boolean) {
    this.isFormValorInvalid = isFormValorInvalid;
  }

}
