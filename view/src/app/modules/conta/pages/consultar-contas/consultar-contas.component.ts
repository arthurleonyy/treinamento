import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ConsultarContas } from 'src/app/core/models/consultar-contas.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consultar-contas',
  templateUrl: './consultar-contas.component.html',
  styleUrls: ['./consultar-contas.component.scss']
})
export class ConsultarContasComponent extends FormBase implements OnInit, AfterViewInit {

  itens: []

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
        required: 'CPF obrigatório.',
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const contas = new ConsultarContas(this.form.value);  
      this.accountsByCpf(contas);
    
    }
  }

  accountsByCpf(contas: ConsultarContas) {
    this.contaService.consultarContasPorCpf(contas.cpf).subscribe(
      response => {            
        this.itens = response.body;
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