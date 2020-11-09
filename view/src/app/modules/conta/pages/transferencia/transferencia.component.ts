import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaTransferencia } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent extends FormBase implements OnInit, AfterViewInit {

  nameScreen = '';

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
    this.getNameScreen();
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência de destino obrigatória.',
      },
      numeroContaDestino: {
        required: 'Número da conta de destino obrigatório.',
      },
      agenciaOrigem: {
        required: 'Agência de origem obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Número da conta de origem obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }
  createFormGroup() {
    this.form = this.formBuilder.group({
      numeroContaOrigem:   ['', Validators.required],
      numeroContaDestino:  ['', Validators.required],
      agenciaOrigem:       ['', Validators.required],
      agenciaDestino:      ['', Validators.required],
      valor:               [0, [Validators.required, ValidatorsCustom.lessThanOne]]
    });
  }

  private getNameScreen() {
    if (this.router.url.includes('transferencia')) {
      this.nameScreen = 'Transferir';
    }
  }



  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  



  onSubmit() {
    if (this.form.valid) {
      const contaTransferencia = new ContaTransferencia(this.form.value);
      if (this.nameScreen === 'Transferir') {
        this.transferencia(contaTransferencia);
      }
    }
  }


  private transferencia(contaTransferencia: ContaTransferencia) {
    this.contaService.transferencia(contaTransferencia).subscribe(
      response => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(
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
