import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.component.html',
  styleUrls: ['./consulta-saldo.component.scss']
})
export class ConsultaSaldoComponent extends FormBase implements OnInit, AfterViewInit {

  saldo: string;

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
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:      ['', Validators.required],
      numeroConta:  ['', Validators.required],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência é obrigatório.',
      },
      numeroConta: {
        required: 'Número da conta é obrigatório.',
      },
    });
  }

  onSubmit(){
    
    if (this.form.valid) {

      const conta = new Conta(this.form.value);

      this.contaService.consultarSaldo(conta.agencia,conta.numeroConta).subscribe( 

        response => {
          conta.valor = response.body
          SweetalertCustom.showAlertConfirm(`O Saldo da Conta ${conta.numeroConta} é\n R$ ${conta.valor}`, { type: 'success' });
        },
        erro =>{

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
