import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Extrato } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent extends FormBase implements OnInit, AfterViewInit {
  //respostaSaldo = '';
  respostaAgencia = '';
  respostaConta = '';
  //respostaNome = '';
  //respostaCpf = '';
  //respostaEmail = '';
  respostaGrana = '';
  formato = '';


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

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta obrigatório.',
      },
    });
  }

  onSubmit() {
    
    if (this.form.valid) {
      const extrato = new Extrato(this.form.value); {
        
        this.consultarExtrato(extrato);
        
    }
  }
}

  private consultarExtrato(extrato: Extrato) {


    this.contaService.consultarExtrato(extrato).subscribe(
      response => {
        console.log(response.body);
        this.formato= response.body;
        this.respostaAgencia = response.body[0].conta.agencia;
        this.respostaConta = response.body[0].conta.numeroConta;
        //this.respostaNome = response.body[0].cliente.nome;
        //this.respostaCpf = response.body[0].cliente.cpf;
        //this.respostaEmail = response.body[0].cliente.email;
        this.respostaGrana = response.body[0].conta.saldo;
        


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
