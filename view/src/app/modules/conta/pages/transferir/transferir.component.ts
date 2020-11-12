import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class TransferirComponent extends FormBase implements OnInit, AfterViewInit {

  constructor(private formBuilder: FormBuilder,
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
      agenciaOrigem:      ['', Validators.required],
      numeroContaOrigem:  ['', Validators.required],
      agenciaDestino:      ['', Validators.required],
      numeroContaDestino:  ['', Validators.required],
      valor:        [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaOrigem: {
        required: 'Agência de Origem da Transferencia é obrigatório.',
      },
      numeroContaOrigem: {
        required: 'Número da conta de Origem da Transferencia é obrigatório.',
      },
      agenciaDestino: {
        required: 'Agência de destino da Transferencia é obrigatório.',
      },
      numeroContaDestino: {
        required: 'Número da conta de destino da Transferencia é obrigatório.',
      },
      valor: {
        required: 'Valor da operação é obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }

  onSubmit(){
    if (this.form.valid) {
      const contaTransferir = new Transferencia(this.form.value);

      this.contaService.transferir(contaTransferir).subscribe(
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

}
