import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Cliente } from 'src/app/core/models/cliente-model';
import { Conta } from 'src/app/core/models/conta.model';
import { Transferencia } from 'src/app/core/models/transferencia.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';
@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent extends FormBase implements OnInit, AfterViewInit {

  contasN: Conta[];

  constructor(

    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ){
    super()
  }
  ngOnInit(){
    this.createFormGroup();
    this.validateMensageError();
  }


  createFormGroup() {
    this.form = this.formBuilder.group({
      cpf:      ['', Validators.required],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      cpf: {
        required: 'CPF e obrigatório.',
      },
    });
  }

  onSubmit() {
      if (this.form.valid) {
        const cliente = new Cliente(this.form.value);
        console.log(cliente);
        this.contaService.contas(cliente).subscribe(
          response => {
            // Recebe as contas na resposta da request
            this.contasN = response.body;
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
