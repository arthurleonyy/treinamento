import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Transferencia } from 'src/app/core/models/transferencia.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

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
      agenciaOrigem: ['', Validators.required],
      agenciaDestino: ['', Validators.required],
      numeroContaOrigem: ['', Validators.required],
      numeroContaDestino: ['', Validators.required],
      valor: ['', [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaOrigem: {
        required: 'Agência de origem obrigatória.',
      },
      agenciaDestino: {
        required: 'Agência de destino obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Conta de origem obrigatória.',
      },
      numeroContaDestino: {
        required: 'Conta de destino obrigatória.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transferencia = new Transferencia(this.form.value);
      this.contaService.transferir(transferencia).subscribe(
        response => {
          SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(
            result => {
              if (result.dismiss) {
                this.router.navigate(['conta/operacoes']);
              }
            }
          );
        }
      );
    }
  }

}
