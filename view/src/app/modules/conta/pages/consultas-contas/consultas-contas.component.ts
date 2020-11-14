import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ContaService } from 'src/app/core/services/conta.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBase } from 'src/app/core/classes/form-base';
import { ConsultarContas } from 'src/app/core/dtos/consultar-contas';
import { Conta } from 'src/app/core/dtos/conta.dto';

@Component({
  selector: 'app-consultas-contas',
  templateUrl: './consultas-contas.component.html',
  styleUrls: ['./consultas-contas.component.scss']
})
export class ConsultasContasComponent extends FormBase implements OnInit , AfterViewInit {

  contas: Conta[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contaService: ContaService
  ) {
    super();
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMessageError();
    console.log(this.form);
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required , ValidatorsCustom.validCpf]]
    });
  }

  validateMessageError() {
    this.createValidateFieldMessage({
      cpf : {
        required: 'Campo cpf é obrigatório.',
        validCpf: 'Cpf Invalido.'
      }
    });

  }

  onSubmit() {
    if (this.form.valid) {
      const cliente = new ConsultarContas(this.form.value);
      this.contaService.consultarContas(cliente).subscribe(
        response => {
          // Recebe as contas na resposta da request
          this.contas = response.body;
          SweetalertCustom.showAlertTimer('Operação realizada com sucesso.',{type: 'success'});//.then(
           /* result => {
              if(result.dismiss){
                this.router.navigate(['/conta/operacoes']);
              }
            }*/
          //);
        },
        erro => {
          console.log(erro);
          if (erro.error.detalhes) {
            SweetalertCustom.showAlertConfirm(`${erro.error.detalhes[0]}`,{type: 'error'});
          } else {
            SweetalertCustom.showAlertConfirm('Falha na Operação',{type: 'error'});
          }
        }

      )
    }
  }

}
