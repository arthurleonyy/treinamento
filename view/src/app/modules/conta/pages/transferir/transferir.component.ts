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

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void{
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agenciaOrigem: ['', Validators.required],
      numeroContaOrigem: ['', Validators.required],
      agenciaDestino: ['', Validators.required],
      numeroContaDestino: ['', Validators.required],
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }


  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaOrigem: {
        required: 'Agência de Origem e obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Número da conta de Origem e obrigatório.',
      },
      agenciaDestino: {
        required: 'Agência Destino e obrigatória.',
      },
      numeroContaDestino: {
        required: 'Número da conta Destino e obrigatório.',
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
