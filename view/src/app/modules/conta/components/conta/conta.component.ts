import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent extends FormBase implements OnInit {

  @Output() agenciaDaContaControl = new EventEmitter<AbstractControl>();
  @Output() numeroContaDaContaControl = new EventEmitter<AbstractControl>();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia: ['', [Validators.required]],
      numeroConta: ['', [Validators.required]],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatório.',
      },
      numeroConta: {
        required: 'Número da conta obrigatório.',
      }
    });
  }

  emitFormControlAgencia() {
    this.agenciaDaContaControl.emit(this.form.controls.agencia);
  }

  emitFormControlNumeroConta() {
    this.numeroContaDaContaControl.emit(this.form.controls.numeroConta);
  }

}
