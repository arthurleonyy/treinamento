import { FormBase } from 'src/app/core/classes/form-base';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { Conta } from 'src/app/core/models/conta.model';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-consultar-saldo',
  templateUrl: './consultar-saldo.component.html',
  styleUrls: ['./consultar-saldo.component.scss']
})
export class ConsultarSaldoComponent extends FormBase implements OnInit, AfterViewInit  {

  conta: Conta;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia: ['', Validators.required],
      numeroConta: ['', Validators.required]
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta  obrigatório.',
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Conta(this.form.value);
      this.contaService.consultarSaldo(conta).subscribe(
        (response) => {
          this.conta = new Conta({
            agencia: conta.agencia,
            numeroConta: conta.numeroConta,
            valor: response.body
          });
        },
      );
    }
  }

}
