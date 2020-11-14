import { Router } from '@angular/router';
import { ContaService } from './../../../../core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Transferencia } from 'src/app/core/models/transferencia.model';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';


@Component({
  selector: 'app-transferencia-conta',
  templateUrl: './transferencia-conta.component.html',
  styleUrls: ['./transferencia-conta.component.scss']
})
export class TransferenciaContaComponent extends FormBase implements OnInit, AfterViewInit {

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

  private createFormGroup() {
    this.form = this.formBuilder.group({
      agenciaDestino: ['', Validators.required],
      agenciaOrigem: ['', Validators.required],
      numeroContaDestino: ['', Validators.required],
      numeroContaOrigem: ['', Validators.required],
      valor: [0, [Validators.required]]
    });
  }

  validateMensageError(){
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência obrigatória',
      },
      agenciaOrigem: {
        required: 'Agência obrigatória.',    
      },
      numeroContaDestino: {
        required: 'Número da conta obrigatório.',
      },
      numeroContaOrigem: {
        required: 'Número da conta obrigatório.',
      },
      valor: {
        required: 'Valor obrigatório',
        lessThanOne: 'Valor informado deve ser maior que zero.' 
      },
    });
    }

    onSubmit(){
      if(this.form.valid){
        const transferencia = new Transferencia(this.form.value);
          this.transferir(transferencia);
      }
    }

    private transferir(transferencia: Transferencia){
      this.contaService.transferir(transferencia).subscribe(
        response => {
          SweetalertCustom.showAlertTimer('Operação realizada com sucesso!', {type: 'success'}).then(
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
          }else{
            SweetalertCustom.showAlertConfirm('Falha na operação', {type: 'error'});
          }
        }
      );
    }
  }
