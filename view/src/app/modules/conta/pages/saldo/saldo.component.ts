import { Saldo } from './../../../../core/dtos/saldo.dto';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBase } from 'src/app/core/classes/form-base';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent extends FormBase implements OnInit , AfterViewInit {

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMessageError();
  }

  createFormGroup(){
    this.form = this.formBuilder.group({
        agencia:       ['', [Validators.required]],
        numeroConta:    ['',[Validators.required]],

    });
  }

  validateMessageError(){
    this.createValidateFieldMessage({
      agencia : {
        required: 'Campo agencia obrigatória.'
      },
      numeroConta : {
        required : 'Campo numeroConta obrigatória'
      }

    });
  }


  onSubmit(){
    if (this.form.valid){
        const saldo = new Saldo(this.form.value);
        this.contaService.saldo(saldo).subscribe(
          response => {

              SweetalertCustom.showAlertTimer(`Saldo Disponivel, R$ ${response.body} `, {type: 'success'}).then(
                result => {
                  if(result.dismiss){
                    this.router.navigate(['conta/operacoes']);
                  }
                }
              );
          },
          erro => {
            if (erro.error.detalhes) {
              SweetalertCustom.showAlertConfirm(erro.error.detalhes[0], {type: 'error'});
            } else {
              SweetalertCustom.showAlertConfirm("Falha na operação", {type: 'error'});
            }

          }
        );
    }
  }


}
