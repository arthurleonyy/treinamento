import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepositarSacarDTO } from 'src/app/core/models/operacoes.model';
import { OperacoesService } from 'src/app/core/services/operacoes.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-depositar-sacar',
  templateUrl: './depositar-sacar.component.html',
  styleUrls: ['./depositar-sacar.component.scss']
})
export class DepositarSacarComponent implements OnInit {

  nameScreen = '';
  isFormContaInvalid = true;
  isFormValorInvalid = true;
  agencia: string;
  numeroConta: string;
  valor: number;

  constructor(
    private operacoesService: OperacoesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getNameScreen();
  }

  private getNameScreen() {
    if (this.router.url.includes('depositar')) {
      this.nameScreen = 'Depositar';
    } else if (this.router.url.includes('sacar')) {
      this.nameScreen = 'Sacar';
    }
  }

  onSubmit() {
    if (!this.isFormContaInvalid && !this.isFormValorInvalid && this.nameScreen) {
      const depositarSacarDTO = new DepositarSacarDTO({
        agencia: this.agencia,
        numeroConta: this.numeroConta,
        valor: this.valor
      });
      this.depositarSacar(depositarSacarDTO, this.nameScreen);
    }
  }

  private depositarSacar(depositarSacarDTO: DepositarSacarDTO, operacao: string) {
    this.operacoesService.depositarSacar(depositarSacarDTO, operacao).subscribe(
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

  setAgenciaDaConta(agencia: string) {
    this.agencia = agencia;
  }

  setNumeroContaDaConta(numeroConta: string) {
    this.numeroConta = numeroConta;
  }

  setValor(valor: number) {
    this.valor = valor;
  }

  setIsFormContaInvalid(isFormContaInvalid: boolean) {
    this.isFormContaInvalid = isFormContaInvalid;
  }

  setIsFormValorInvalid(isFormValorInvalid: boolean) {
    this.isFormValorInvalid = isFormValorInvalid;
  }

}
