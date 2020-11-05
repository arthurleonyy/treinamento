import { AfterViewInit, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { GenericValidatorForm } from 'src/app/shared/utils/generic-validator-form';
import { Util } from 'src/app/shared/utils/util';
import { ValidationMessages } from 'src/app/shared/utils/validation-messages';
import { ButtonSubmit } from '../models/button-submit.model';
import { ValidateMessage } from '../models/validate-message.model';

export class FormBase implements OnInit, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    public nameScreen = '';
    public pageId = '';

    // Utilizados para validação e submição
    validateMessage: ValidateMessage = new ValidateMessage();
    public buttonSubmit: ButtonSubmit = new ButtonSubmit();

    public form: FormGroup;

    private permissionUser;

    constructor(
      public router: Router,
      public activatedRoute: ActivatedRoute,
    ) {
        this.getParamsScreen();
    }

    ngOnInit(): void {
    }

    hiddenComponenteWithAll(permissions: string[]) {
      const existList = permissions.find(x => x.includes(this.permissionUser));

      if (!existList) {
        return false;
      }

      return true;
    }

    ngAfterViewInit(): void {
        this.controlsBlurValidate();
        this.createValidateFields();
      }

    /**
     * Função que obtem a ação a ser executada
     */
    getParamsScreen() {
        this.pageId = this.activatedRoute.snapshot.params.id;
        this.nameScreen = Util.getScreenName(this.pageId);
    }

    /**
     * Função que realiza a validação por Blur
     */
    controlsBlurValidate() {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
      merge(...controlBlurs).subscribe(value => {
        this.validateMessage.messageDisplay = this.validateMessage.genericValidator.processMessages(this.form);
      });
    }

    /**
     * Seta a classe de erro no campo
     * @param field Campo a ser realizado a tratativa
     */
    setErrorValidate(field) {
      return Util.setErrorsValidate(this.form, this.validateMessage.messageDisplay, field);
    }

    /**
     * Função que habilita/desabilita o botão de salvar
     * verificando ser o form é valido
     */
    enableShipping() {
      if (this.form.valid && !this.buttonSubmit.buttonSubmited) {
        return false;
      }
      return true;
    }


    /**
     * Utilizados no autocomplete
     */
    updateErrors() {
      setTimeout(() => {
        this.validateMessage.messageDisplay = this.validateMessage.genericValidator.processMessages(this.form);
      }, 100);
    }

    /**
     * Mensagens utilizadas na validação
     */
    createValidateFields() {
      this.validateMessage.validationMessages = ValidationMessages.msg();
      this.validateMessage.genericValidator = new GenericValidatorForm(this.validateMessage.validationMessages);
    }
}
