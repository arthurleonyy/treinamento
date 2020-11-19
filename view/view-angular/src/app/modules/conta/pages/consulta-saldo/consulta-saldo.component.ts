import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.component.html',
  styleUrls: ['./consulta-saldo.component.scss']
})
export class ConsultaSaldoComponent  extends FormBase implements OnInit, AfterViewInit {

  conta: Conta;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:       ['', Validators.required],
      numeroConta:   ['', Validators.required],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência é obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta é obrigatório.',
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Conta(this.form.value);
      this.consultarSaldo(conta);
    }
  }

  public consultarSaldo(conta: Conta) {
    this.contaService.consultarSaldo(conta).subscribe(
      (response) => {
        this.conta = new Conta({
          agencia: conta.agencia,
          numeroConta: conta.numeroConta,
          valor: response.body
        });
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
