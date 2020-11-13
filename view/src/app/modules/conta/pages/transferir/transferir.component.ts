import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
import { FormBase } from './../../../../core/classes/form-base';
import { TransferirDTO } from './../../../../core/models/conta.model';
import { ContaService } from './../../../../core/services/conta.service';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit {

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
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {

    this.createValidateFieldMessage({
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor deve ser maior que 0.'
      },
    });
  }

  onSubmit() {
    const transferirDTO = new TransferirDTO(this.form.value);
    this.transferir(transferirDTO);
  }

  private transferir(transferirDTO: TransferirDTO) {
    this.contaService.transferir(transferirDTO).subscribe(
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

  getControlAgenciaDaContaOrigem(agencia: AbstractControl) {
    this.form.addControl('agenciaOrigem', agencia);
  }

  getControlNumeroContaDaContaOrigem(numeroConta: AbstractControl) {
    this.form.addControl('numeroContaOrigem', numeroConta);
  }

  getControlAgenciaDaContaDestino(agencia: AbstractControl) {
    this.form.addControl('agenciaDestino', agencia);
  }

  getControlNumeroContaDaContaDestino(numeroConta: AbstractControl) {
    this.form.addControl('numeroContaDestino', numeroConta);
  }

}
