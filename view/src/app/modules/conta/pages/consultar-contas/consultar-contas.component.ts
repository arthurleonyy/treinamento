import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Cliente } from 'src/app/core/models/cliente.model';
import { Conta } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consultar-contas',
  templateUrl: './consultar-contas.component.html',
  styleUrls: ['./consultar-contas.component.scss']
})
export class ConsultarContasComponent extends FormBase implements OnInit, AfterViewInit {

  contas: Conta[];

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

  validateMensageError() {
    this.createValidateFieldMessage({
      cpf: {
        required: 'Agência é obrigatório.',
      },
    });
  }

  onSubmit(){
    if (this.form.valid) {

      const cliente = new Cliente(this.form.value);

      this.contaService.buscarContasByCpf(cliente.cpf).subscribe(
        response => {
          this.contas = response.body
        },
        erro => {
          SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });
        }
      );
    }
  }
}
