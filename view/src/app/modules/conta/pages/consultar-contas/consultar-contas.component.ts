import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consultar-contas',
  templateUrl: './consultar-contas.component.html',
  styleUrls: ['./consultar-contas.component.scss']
})
export class ConsultarContasComponent extends FormBase implements OnInit, AfterViewInit {

  itens: []

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
      cpf:           ['', Validators.required],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      cpf: {
        required: 'CPF obrigatório.',
      },
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta obrigatório.',
      },
    });
  }

  formateSaldo(saldo: String) {
    saldo = saldo.toString()
    let saldoFormatado = 'R$ ' + saldo.replace('.', ',')
    if (saldo.indexOf(".") == -1) {
      saldoFormatado = saldoFormatado + ',00'
    }
    return saldoFormatado
  }

  allAccounts() {
    this.contaService.consultarContas().subscribe(
      response => {            
        this.itens = response.body;
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

  accountsByCpf() {
    let cpf = this.form.value.cpf
    if (cpf) {
      this.contaService.consultarContasPorCpf(cpf).subscribe(
        response => {            
          this.itens = response.body;
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

}