import { SweetalertCustom } from './../../../../shared/utils/sweetalert-custom';
import { ContaService } from 'src/app/core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from './../../../../core/classes/form-base';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultarExtrato } from 'src/app/core/models/extrato.model';


@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})

export class ExtratoComponent extends FormBase implements OnInit, AfterViewInit {

  retorno = [];


  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia: ['', Validators.required],
      numeroConta: ['', Validators.required],

    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({

      agencia: {
        required: 'Agência é obrigatória.',
      },
      numeroConta: {
        required: 'Número conta é obrigatório.',
      },

    });
  }
  onSubmit() {

    if (this.form.valid) {
      const contas = new ConsultarExtrato(this.form.value);
      this.consultar(contas);

    }
  }

  private consultar(contas: ConsultarExtrato) {
    this.contaService.extrato(contas).subscribe(
      response => {

        this.retorno = response.body;

        erro => {
          if (erro.error.detalhes) {
            SweetalertCustom.showAlertConfirm(erro.error.detalhes[0], { type: 'error' });
          } else {
            SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });
          }
        }
      }
    );
  }
}