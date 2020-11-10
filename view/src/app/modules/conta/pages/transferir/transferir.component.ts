import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Transferir } from 'src/app/core/models/transferir.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit, AfterViewInit {
  [x: string]: any;

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

  createFormGroup(){
    this.form = this.formBuilder.group({
      agenciaDestino:      ['', Validators.required],
      agenciaOrigem:      ['', Validators.required],
      numeroContaDestino:  ['', Validators.required],
      numeroContaOrigem:  ['', Validators.required],
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError(){
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência de Destino Obrigatória.',
      },
      numeroContaDestino: {
        required: 'Número da Conta Destino Obrigatório.',
      },
      agenciaOrigem: {
        required: 'Agência obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Número da conta obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }

  onSubmit(){
    if (this.form.valid) {
      const conta = new Transferir(this.form.value);
      this.contaService.transferir(conta).subscribe(
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

