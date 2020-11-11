import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBase } from 'src/app/core/classes/form-base';
import { Router } from '@angular/router';
import { Conta } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent extends FormBase implements OnInit, AfterViewInit {

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMensageError()
  }
  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia: ['', Validators.required],
      numeroConta: ['', Validators.required],

    });
  }
  validateMensageError() {
    this.createValidateFieldMessage({

      agencia: {
        required: 'Agência é obrigatória.',
      },
      numeroConta: {
        required: 'Conta é obrigatória.',
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Conta(this.form.value);
      this.saldo(conta);
    }
  }

  private saldo(conta: Conta) {
    this.contaService.saldo(conta).subscribe(
      response => {
        SweetalertCustom.showAlertConfirm(`O saldo da conta é: R$ ${response.body},00`,
          { type: 'success' }).then(
            result => {
              this.router.navigate(['conta/operacoes']);
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
