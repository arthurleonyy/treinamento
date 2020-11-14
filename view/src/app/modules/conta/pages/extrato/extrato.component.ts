import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Conta } from 'src/app/core/models/conta.model';
import { Extrato } from 'src/app/core/models/extrato.model';
import { ExtratoService } from 'src/app/core/services/extrato.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent extends FormBase implements OnInit, AfterViewInit {

  extratos: Extrato[];

  constructor(
    private formBuilder: FormBuilder,
    private extratoService: ExtratoService,
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
      numeroConta:   ['', Validators.required],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência é obrigatório.',
      },
      numeroConta: {
        required: 'Numero da Conta é obrigatório.',
      },
    });
  }

  onSubmit(){
    if (this.form.valid) {

      const conta = new Conta(this.form.value);

      this.extratoService.findByAgenciaAndNumConta(conta.agencia,conta.numeroConta).subscribe(
        response => {
          this.extratos = response.body
        },
        erro => {
          SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });
        }
      );
    }
  }

}
