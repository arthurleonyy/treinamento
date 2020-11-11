import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { Transferencia } from 'src/app/core/models/transferencia.model';
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
  ){
    super()
  }

  ngOnInit() {

    this.createFormGroup();
    this.validateMensageError();
    this.getNameScreen();
  }

  private getNameScreen() {
    if(this.router.url.includes('transferir')){
      this.nameScreen = 'Transferir'
    }
  }


  createFormGroup() {
    this.form = this.formBuilder.group({
      agenciaOrigem:      ['', Validators.required],
      numeroContaOrigem:  ['', Validators.required],
      valor:        [0, [Validators.required, ValidatorsCustom.lessThanOne]],
      agenciaDestino:      ['', Validators.required],
      numeroContaDestino:  ['', Validators.required],
    });
  }


  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaOrigem: {
        required: 'Agência Origem e obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Número da conta Origem  obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
      agenciaDestino: {
        required: 'Agência Destino e obrigatória.',
      },
      numeroContaDestino: {
        required: 'Número da conta Destino  obrigatório.',
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Transferencia(this.form.value);
      this.transferir(conta);
    }
  }

  private transferir(conta: Transferencia) {
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
