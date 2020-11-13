import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conta } from './../../../../core/models/conta.model';
import { ContaService } from '../../../../core/services/conta.service';
import { SweetalertCustom } from './../../../../shared/utils/sweetalert-custom';

@Component({
  selector: 'app-extrato-saldo',
  templateUrl: './extrato-saldo.component.html',
  styleUrls: ['./extrato-saldo.component.scss']
})
export class ExtratoSaldoComponent implements OnInit {

  nameScreen = '';
  isFormContaInvalid = true;
  agencia: string;
  numeroConta: string;

  constructor(
    private contaService: ContaService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getNameScreen();
  }

  private getNameScreen() {
    if (this.router.url.includes('extrato')) {
      this.nameScreen = 'Extrato';
    } else if (this.router.url.includes('saldo')) {
      this.nameScreen = 'Saldo';
    }
  }

  onSubmit() {
    if (!this.isFormContaInvalid && this.nameScreen) {
      const conta = new Conta(this.agencia, this.numeroConta);
      this.extratoSaldo(conta, this.nameScreen);
    }
  }

  private extratoSaldo(conta: Conta, operacao: string) {
    this.contaService.extratoSaldo(conta, operacao).subscribe(
      response => {
        console.log(response.body);
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

  setIsFormContaInvalid(isFormContaInvalid: boolean) {
    this.isFormContaInvalid = isFormContaInvalid;
  }

}
