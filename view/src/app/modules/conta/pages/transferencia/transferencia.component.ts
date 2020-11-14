import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBase } from 'src/app/core/classes/form-base';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/core/services/conta.service';
import { Transferencia } from 'src/app/core/models/transferencia.model';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent extends FormBase implements OnInit , AfterViewInit {


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

  ngAfterViewInit() {
    this.controlsBlurValidate();
  }

  createFormGroup(){
    this.form = this.formBuilder.group({
        agenciaDestino:       ['', [Validators.required]],
        agenciaOrigem:        ['', [Validators.required]],
        numeroContaDestino:   ['', [Validators.required]],
        numeroContaOrigem:    ['', [Validators.required]],
        valor:                [0 , [Validators.required , ValidatorsCustom.lessThanOne]]
    })
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência destino obrigatória.',
      },
      agenciaOrigem: {
        required: 'Agência origem obrigatória.',
      },
      numeroContaDestino: {
        required: 'Numero da conta de destino obrigatória.',
      },
      numeroContaOrigem: {
        required: 'Numero da conta de origem obrigatória.',
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
    });
  }

  onSubmit(){
    if(this.form.valid){
        const transferencia = new Transferencia(this.form.value);
        this.contaService.transferir(transferencia).subscribe(
          response => {
              SweetalertCustom.showAlertTimer('Transferencia realizada com sucesso.', {type: 'success'}).then(
                result => {
                  if(result.dismiss){
                    this.router.navigate(['conta/operacoes']);
                  }
                }
              );
          },
          erro => {
            if(erro.error.detalhes) {
              SweetalertCustom.showAlertConfirm(erro.error.detalhes[0], {type: 'error'});
            }else{
              SweetalertCustom.showAlertConfirm('Falha na operação', {type: 'error'});
            }

          }
        );
    }
  }

}
