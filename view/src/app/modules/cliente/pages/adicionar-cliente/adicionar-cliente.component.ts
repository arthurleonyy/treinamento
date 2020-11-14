import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.scss']
})
export class AdicionarClienteComponent extends FormBase implements OnInit, AfterViewInit {

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
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
      nome:         ['', Validators.required],
      email:        ['', Validators.required],
      cpf:          ['', Validators.required],
      observacoes:  [''],
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      nome: {
        required: 'Campo Nome é obrigatório.',
      },
      email: {
        required: 'Campo E-mail é obrigatório.',
      },
      cpf: {
        required: 'Campo CPF é obrigatório.',
      },
    });
  }

  onSubmit() {

    if(this.form.valid){
      const cliente = new Cliente(this.form.value);

      cliente.ativo = true;
      this.clienteService.adicionarCliente(cliente).subscribe(
        
        response => {
          SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(
            result => {
              if (result.dismiss) {
                this.router.navigate(['cliente/listar']);
              }
            }
          );
        },
        erro => {
          SweetalertCustom.showAlertConfirm('Falha na operação.', { type: 'error' });        
        }

      );
    }

  }

}
