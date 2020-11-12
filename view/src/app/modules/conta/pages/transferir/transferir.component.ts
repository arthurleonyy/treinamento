import { Transferir } from 'src/app/core/models/transferir.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';



@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit,AfterViewInit {
  nameScreen: string;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router)
    {
  super();  
  }
  

  ngOnInit() {
      this.createFormGroup();
      this.validateMensageError();
      this.getNameScreen();
  }


    createFormGroup(){
      this.form = this.formBuilder.group({
        agenciaOrigem: ['', Validators.required],
        agenciaDestino: ['', Validators.required],
        numeroContaOrigem:  ['', Validators.required],
        numeroContaDestino:  ['', Validators.required],
        valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
      });
    }


    validateMensageError(){
      this.createValidateFieldMessage({
        agenciaOrigem: {
          required: 'Agência de origem obrigatória.',
        },
        agenciaDestino: {
          required: 'Agência de destino obrigatória.',
        },
        numeroContaOrigem: {
          required: 'Número da conta de origem obrigatório.',
        },
        numeroContaDestino: {
          required: 'Número da conta destino obrigatório.',
        },
        valor: {
          required: 'Valor obrigatório.',
          lessThanOne: 'Valor informado deve ser maior que zero.'
        },
      });
    }


    onSubmit() {
      if (this.form.valid) {
        const transferir = new Transferir(this.form.value);
        if (this.nameScreen === 'Transferir') {
          this.transferir(transferir); 

        } 
      }
    }

    private getNameScreen() {
      if (this.router.url.includes('transferir')) {
        this.nameScreen = 'Transferir';
      } 
    }


    private transferir(obj: Transferir) {
      this.contaService.transferir(obj).subscribe(
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
    
  



