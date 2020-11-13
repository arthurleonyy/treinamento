import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent extends FormBase implements OnInit {

  @Output() agenciaDaConta = new EventEmitter<string>();
  @Output() numeroContaDaConta = new EventEmitter<string>();
  @Output() isFormContaInvalid = new EventEmitter<boolean>();

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

  emitFormAgencia() {
    this.agenciaDaConta.emit(this.form.value.agencia);
  }

  emitFormNumeroConta() {
    this.numeroContaDaConta.emit(this.form.value.numeroConta);
  }

  emitIsFormContaInvalid() {
    this.isFormContaInvalid.emit(this.form.invalid);
  }

}
