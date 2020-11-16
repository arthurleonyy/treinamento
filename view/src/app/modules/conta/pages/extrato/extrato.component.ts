import { Conta } from 'src/app/core/models/conta.model';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/core/services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Extrato } from 'src/app/core/models/extrato.model';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent extends FormBase implements OnInit, AfterViewInit {

  extratos: '';
  agencia = '';
  numeroConta = '';
  saldo = '';

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private router: Router
  ) 
  {
    super();
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup(){
    this.form = this.formBuilder.group({
      agencia: ['', Validators.required],
      numeroConta: ['', Validators.required],
    });
  }

  validateMensageError(){
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.',
      },
      numeroConta: {
        required: 'Número da conta obrigatório.',
      }
    });
  }

  onSubmit(){
    if(this.form.valid){
      const extrato = new Extrato(this.form.value);
        this.consultarExtrato(extrato);
      }
    }

    public consultarExtrato(extrato: Extrato){
      this.contaService.extrato(extrato).subscribe(
        response => {
          this.extratos = response.body;
          this.agencia = response.body[0].conta.agencia;
          this.numeroConta = response.body[0].conta.numeroConta;
          this.saldo = response.body[0].conta.saldo;
        }
      )
    }
  }

