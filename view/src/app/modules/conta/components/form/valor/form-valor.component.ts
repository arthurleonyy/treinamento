import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from 'src/app/core/classes/form-base';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-form-valor',
  templateUrl: './form-valor.component.html',
  styleUrls: ['./form-valor.component.scss']
})
export class FormValorComponent extends FormBase implements OnInit {

  @Output() valor = new EventEmitter<number>();
  @Output() isFormValorInvalid = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.validateMensageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]]
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor deve ser maior que 0.'
      }
    });
  }

  emitFormValor() {
    this.valor.emit(this.form.value.valor);
  }

  emitIsFormValorInvalid() {
    this.isFormValorInvalid.emit(this.form.invalid);
  }

}
