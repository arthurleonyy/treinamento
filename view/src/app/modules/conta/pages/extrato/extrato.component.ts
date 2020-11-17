import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/core/services/conta.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { Extrato } from 'src/app/core/models/extrato.model';


@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent extends FormBase implements OnInit , AfterViewInit{

  extratos: Extrato[];


  constructor(
    private contaService: ContaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();
   }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMessageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:     ['', Validators.required],
      numeroConta: ['', Validators.required],
    });
  }

  validateMessageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Campo Obrigatório.'
      },
      numeroConta: {
        requerid: 'Campo Obrigatório.'
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const conta = new Conta(this.form.value);
      console.log(conta);
      this.contaService.consultarExtrato(conta).subscribe(
          response => {
            this.extratos = response.body;
            console.log(this.extratos);
            SweetalertCustom.showAlertConfirm('Operação realizada com sucesso.',{type: 'success'});
          },
          erro => {
            console.log(erro);
            if(erro.error.detalhes){
              SweetalertCustom.showAlertConfirm(`Falha na Operação, ${erro.error.detalhes[0]}`,{ type: 'error'});
            } else {
              SweetalertCustom.showAlertConfirm('Falha na Operação.',{ type: 'error'});
            }
          }
      );
    }
  }

}
