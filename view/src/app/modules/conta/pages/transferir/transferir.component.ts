import { Transferencia } from './../../../../core/models/transferencia.model';
import { Router } from '@angular/router';
import { SweetalertCustom } from './../../../../shared/utils/sweetalert-custom';
import { ContaService } from 'src/app/core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from './../../../../core/classes/form-base';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
import { Conta } from 'src/app/core/models/conta.model';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit, AfterViewInit {

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
      agenciaDestino: ['', Validators.required],
      agenciaOrigem: ['', Validators.required],
      numeroContaDestino: ['', Validators.required],
      numeroContaOrigem: ['', Validators.required],
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência Destino obrigatória.',
      },
      agenciaOrigem: {
        required: 'Agência Origem obrigatória.',
      },
      numeroContaDestino: {
        required: 'Número da conta Destino obrigatório.',
      },
      numeroContaOrigem: {
        required: 'Número da conta Origem obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transferencia = new Transferencia(this.form.value)
      this.contaService.transferir(transferencia).subscribe(
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
  }
}