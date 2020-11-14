import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { Extrato } from 'src/app/core/models/extrato.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent extends FormBase implements OnInit, AfterViewInit {

  itens: []
  itemSaldo: string
  flag: boolean
  valor: number
  noTransactionFound: boolean

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
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
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Extrato(this.form.value);
      this.flag = false
      this.valor = 0
      this.noTransactionFound = false
      this.consultarExtrato(conta);      
    }
  }

  private consultarExtrato(conta: Extrato) {
    this.contaService.consultarExtrato(conta).subscribe(
      response => {
        if (response.body.length !== 0){
          this.itens = response.body;
          this.itemSaldo = response.body[0].conta.saldo
          this.flag = true
        }
        else {
          this.noTransactionFound = true
        }       
      },
      erro =>  {
        if (erro.error.detalhes) {
          SweetalertCustom.showAlertConfirm(erro.error.detalhes[0], { type: 'error' });
        } else {
          SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });
        }
      }
    );
  }

}
