import { SweetalertCustom } from './../../../../shared/utils/sweetalert-custom';
import { Router } from '@angular/router';
import { ContaService } from './../../../../core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Saldo } from 'src/app/core/models/saldo.model';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.component.html',
  styleUrls: ['./consulta-saldo.component.scss']
})
export class ConsultaSaldoComponent extends FormBase implements OnInit, AfterViewInit {
 
  nameScreen = 'Saldo';
  mostraSaldo = null;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) 
  {
    super();
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMessageError();
  }

  private createFormGroup(){
    this.form = this.formBuilder.group({
      agencia: ['', Validators.required],
      numeroConta: ['', Validators.required]
    });
  }

  validateMessageError(){
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroconta: {
        required: 'Número da conta obrigatório.',
      },
    });
  }

  onSubmit(){
    if(this.form.valid){
      const obj = new Saldo(this.form.value);
        if(this.nameScreen === 'Saldo'){
          this.saldo(obj);
        }
      }
    }

    private saldo(obj: Saldo){
      this.contaService.saldo(obj).subscribe(
        response => {
          this.mostraSaldo = response.body;
          SweetalertCustom.showAlertTimer('Saldo da conta: R$' + this.mostraSaldo, {type: 'success'}).then(
            result => {
              if(result.dismiss){
                this.router.navigate(['conta/operacoes']);
              }
            }
          );
        },
        erro => {
          if(erro.error.detalhes){
            SweetalertCustom.showAlertConfirm(erro.error.detalhes[0], {type: 'error'});
          } else{

          } SweetalertCustom.showAlertConfirm('Falha na operação', {type: 'error'});
        }
      )
    };
  }


