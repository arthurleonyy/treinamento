import { ConsultarContas } from 'src/app/core/models/consultar-contas.model';
import { Router } from '@angular/router';
import { SweetalertCustom } from './../../../../shared/utils/sweetalert-custom';
import { ContaService } from 'src/app/core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from './../../../../core/classes/form-base';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-consultar-contas',
  templateUrl: './consultar-contas.component.html',
  styleUrls: ['./consultar-contas.component.scss']
})

export class ConsultarContasComponent extends FormBase implements OnInit, AfterViewInit {

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
      cpf: ['', Validators.required],

    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({

      cpf: {
        required: 'Informar o cpf é obrigatório.',
      },

    });
  }
  onSubmit() {

    if (this.form.valid) {
      const contas = new ConsultarContas(this.form.value);
      this.consultar(contas);

    }
  }

  private consultar(contas: ConsultarContas) {


    this.contaService.consultarContas(contas).subscribe(
      response => {
        console.log(response.body);
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