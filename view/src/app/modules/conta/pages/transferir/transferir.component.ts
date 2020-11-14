import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContaService } from 'src/app/core/services/conta.service';
import { Router } from '@angular/router';
import { Conta } from 'src/app/core/models/conta.model';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { FormBase } from 'src/app/core/classes/form-base';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
import { Transferir } from 'src/app/core/models/transferir.model';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit, AfterViewInit {

  nameScreen: string;

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
      agenciaDestino:       ['', Validators.required],
      numeroContaOrigem:    ['', Validators.required],
      agenciaOrigem:        ['', Validators.required],
      numeroContaDestino:   ['', Validators.required],
      valor:                [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  
  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência Destino é obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Número da Conta Origem é obrigatório.',
      },
      agenciaOrigem: {
        required: 'Agência Origem é obrigatória.',
      },
      numeroContaDestino: {
        required: 'Número da Conta de Destino obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }
 

  onSubmit() {
    if (this.form.valid) {
      const transferir = new Transferir(this.form.value);
      this.contaService.transferir(transferir).subscribe(
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
