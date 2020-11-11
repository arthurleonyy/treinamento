import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Contas } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent extends FormBase implements OnInit, AfterViewInit {

  //respostaSaldo = '';
  //respostaAgencia = '';
  //respostaConta = '';
  //respostaNome = '';
  //respostaCpf = '';
  //respostaEmail = '';
  //respostaGrana = '';
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
      cpf:      ['', Validators.required],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'CPF obrigatório.',
      },

    });
  }

  onSubmit() {
    
    if (this.form.valid) {
      const contas = new Contas(this.form.value); {
        
        this.consultarContas(contas);
        
    }
  }
}

  private consultarContas(contas: Contas) {


    this.contaService.consultarContas(contas).subscribe(
      response => {
        console.log(response.body);
        this.formato= response.body;
        //this.respostaAgencia = response.body[0].agencia;
        //this.respostaConta = response.body[0].numeroConta;
        //this.respostaNome = response.body[0].cliente.nome;
        //this.respostaCpf = response.body[0].cliente.cpf;
        //this.respostaEmail = response.body[0].cliente.email;
        //this.respostaGrana = response.body[0].saldo;
        


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
