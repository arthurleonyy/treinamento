import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { TransferirDTO } from './../../../../core/models/operacoes.model';
import { OperacoesService } from '../../../../core/services/operacoes.service';

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
    private operacoesService: OperacoesService,
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
    this.operacoesService.transferir(transferirDTO).subscribe(
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

  setAgenciaDaContaOrigem(agencia: string) {
    this.agenciaOrigem = agencia;
  }

  setNumeroContaDaContaOrigem(numeroConta: string) {
    this.numeroContaOrigem = numeroConta;
  }

  setAgenciaDaContaDestino(agencia: string) {
    this.agenciaDestino = agencia;
  }

  setNumeroContaDaContaDestino(numeroConta: string) {
    this.numeroContaDestino = numeroConta;
  }

  setValor(valor: number) {
    this.valor = valor;
  }

  setIsFormContaOrigemInvalid(isFormContaInvalid: boolean) {
    this.isFormContaOrigemInvalid = isFormContaInvalid;
  }

  setIsFormContaDestinoInvalid(isFormContaInvalid: boolean) {
    this.isFormContaDestinoInvalid = isFormContaInvalid;
  }

  setIsFormValorInvalid(isFormValorInvalid: boolean) {
    this.isFormValorInvalid = isFormValorInvalid;
  }

}
