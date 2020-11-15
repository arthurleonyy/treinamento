import { Conta } from './../../../../core/models/conta.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaService } from 'src/app/core/services/conta.service';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.component.html',
  styleUrls: ['./consulta-saldo.component.scss']
})
export class ConsultaSaldoComponent extends FormBase implements OnInit {

  conta: Conta;
  listaContas;
 

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:      ['', Validators.required],
      numeroConta:  ['', Validators.required],
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
      const conta = new Conta(this.form.value);
      this.contaService.saldo(conta).subscribe(
        (response) => {
          this.conta = new Conta({
            agencia: conta.agencia,
            numeroConta: conta.numeroConta,
            valor: response.body
          });
        }
      );
    }
  }

}