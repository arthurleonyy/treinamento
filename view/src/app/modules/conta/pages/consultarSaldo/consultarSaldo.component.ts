import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ConsultarSaldo } from 'src/app/core/models/consultarSaldo.model';
import { Conta } from 'src/app/core/models/conta.model';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-consultarSaldo',
  templateUrl: './consultarSaldo.component.html',
  styleUrls: ['./consultarSaldo.component.scss']
})
export class ConsultarSaldoComponent extends FormBase implements OnInit {

  conta:Conta;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super()
   }

  ngOnInit() {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:      ['', Validators.required],
      numeroConta:  ['', Validators.required],
    });
  }

  
  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta obrigatório.',
      },
      
    });
  }

  onSubmit(){
    if (this.form.valid) {
      const cs = new Conta(this.form.value);
      this.contaService.consultarSaldo(cs.agencia, cs.numeroConta).subscribe(
        response => {
          this.conta = new Conta({
            agencia: cs.agencia,
            numeroConta: cs.numeroConta,
            valor: response.body
          });
          
        }
        
      );
    }
  }

}
