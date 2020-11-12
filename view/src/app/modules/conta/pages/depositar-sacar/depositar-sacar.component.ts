import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-depositar-sacar',
  templateUrl: './depositar-sacar.component.html',
  styleUrls: ['./depositar-sacar.component.scss']
})
export class DepositarSacarComponent extends FormBase implements OnInit, AfterViewInit {

  nameScreen = '';

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router) {
    super();
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMensageError();
    this.getNameScreen();
  }

  private getNameScreen() {
    if (this.router.url.includes('depositar')) {
      this.nameScreen = 'Depositar';
    } else if (this.router.url.includes('sacar')) {
      this.nameScreen = 'Sacar';
    }
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:      ['', Validators.required],
      numeroConta:  ['', Validators.required],
      valor:        [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Conta(this.form.value);
      if (this.nameScreen === 'Depositar') {
        this.depositar(conta);
      } else if (this.nameScreen === 'Sacar') {
        this.sacar(conta);
      }
    }
  }

  private depositar(conta: Conta) {
    this.contaService.depositar(conta).subscribe(
      response => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(
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

  private sacar(conta: Conta) {
    this.contaService.sacar(conta).subscribe(
      response => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(
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

}
