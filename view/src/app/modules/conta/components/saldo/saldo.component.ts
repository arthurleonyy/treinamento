import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { Saldo } from 'src/app/core/models/saldo.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent extends FormBase implements OnInit, AfterViewInit {

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ){
    super()
   }

  ngOnInit(){
    this.createFormGroup();
    this.validateMensageError();
  }


  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:      ['', Validators.required],
      numeroConta:  ['', Validators.required],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência e obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta  obrigatório.',
      },
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const conta = new Conta(this.form.value);
      this.consultarSaldo(conta);
    }
  }
  private consultarSaldo(conta: Conta) {
    this.contaService.saldo(conta).subscribe(
      response => {
        SweetalertCustom.showAlertConfirm(`Saldo: R$ ${response.body}`, {type:`success`})
        .then(
          redirect =>{
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
