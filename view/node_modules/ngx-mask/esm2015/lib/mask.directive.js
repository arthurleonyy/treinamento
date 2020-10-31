/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config, timeMasks, withoutValidation } from './config';
import { MaskService } from './mask.service';
// tslint:disable deprecation
export class MaskDirective {
    /**
     * @param {?} document
     * @param {?} _maskService
     * @param {?} _config
     */
    constructor(document, _maskService, _config) {
        this.document = document;
        this._maskService = _maskService;
        this._config = _config;
        this.maskExpression = '';
        this.specialCharacters = [];
        this.patterns = {};
        this.prefix = '';
        this.suffix = '';
        this.thousandSeparator = ' ';
        this.decimalMarker = '.';
        this.dropSpecialCharacters = null;
        this.hiddenInput = null;
        this.showMaskTyped = null;
        this.placeHolderCharacter = null;
        this.shownMaskExpression = null;
        this.showTemplate = null;
        this.clearIfNotMatch = null;
        this.validation = null;
        this.separatorLimit = null;
        this.allowNegativeNumbers = null;
        this._maskValue = '';
        this._position = null;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouch = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { maskExpression, specialCharacters, patterns, prefix, suffix, thousandSeparator, decimalMarker, dropSpecialCharacters, hiddenInput, showMaskTyped, placeHolderCharacter, shownMaskExpression, showTemplate, clearIfNotMatch, validation, separatorLimit, allowNegativeNumbers, } = changes;
        if (maskExpression) {
            this._maskValue = changes.maskExpression.currentValue || '';
        }
        if (specialCharacters) {
            if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
                return;
            }
            else {
                this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || [];
            }
        }
        // Only overwrite the mask available patterns if a pattern has actually been passed in
        if (patterns && patterns.currentValue) {
            this._maskService.maskAvailablePatterns = patterns.currentValue;
        }
        if (prefix) {
            this._maskService.prefix = prefix.currentValue;
        }
        if (suffix) {
            this._maskService.suffix = suffix.currentValue;
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator.currentValue;
        }
        if (decimalMarker) {
            this._maskService.decimalMarker = decimalMarker.currentValue;
        }
        if (dropSpecialCharacters) {
            this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
        }
        if (hiddenInput) {
            this._maskService.hiddenInput = hiddenInput.currentValue;
        }
        if (showMaskTyped) {
            this._maskService.showMaskTyped = showMaskTyped.currentValue;
        }
        if (placeHolderCharacter) {
            this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
        }
        if (shownMaskExpression) {
            this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
        }
        if (showTemplate) {
            this._maskService.showTemplate = showTemplate.currentValue;
        }
        if (clearIfNotMatch) {
            this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
        }
        if (validation) {
            this._maskService.validation = validation.currentValue;
        }
        if (separatorLimit) {
            this._maskService.separatorLimit = separatorLimit.currentValue;
        }
        if (allowNegativeNumbers) {
            this._maskService.maskSpecialCharacters = this._maskService.maskSpecialCharacters.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c !== '-'));
        }
        this._applyMask();
    }
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    validate({ value }) {
        if (!this._maskService.validation) {
            return null;
        }
        if (this._maskService.ipError) {
            return this._createValidationError(value);
        }
        if (this._maskValue.startsWith('separator')) {
            return null;
        }
        if (withoutValidation.includes(this._maskValue)) {
            return null;
        }
        if (this._maskService.clearIfNotMatch) {
            return null;
        }
        if (timeMasks.includes(this._maskValue)) {
            return this._validateTime(value);
        }
        if (value && value.toString().length >= 1) {
            /** @type {?} */
            let counterOfOpt = 0;
            for (const key in this._maskService.maskAvailablePatterns) {
                if (this._maskService.maskAvailablePatterns[key].optional &&
                    this._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this._maskValue.indexOf(key) !== this._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        const opt = this._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        (i) => i === key))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this._maskValue.indexOf(key) !== -1 && value.toString().length >= this._maskValue.indexOf(key)) {
                        return null;
                    }
                    if (counterOfOpt === this._maskValue.length) {
                        return null;
                    }
                }
            }
            if (this._maskValue.indexOf('{') === 1 &&
                value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
                return null;
            }
            if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
                return null;
            }
            else if ((this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
                (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?')) ||
                this._maskValue.indexOf('{') === 1) {
                return this._createValidationError(value);
            }
            if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
                /** @type {?} */
                const length = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length) {
                    return this._createValidationError(value);
                }
            }
        }
        return null;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        const position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        let caretShift = 0;
        /** @type {?} */
        let backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        (shift, _backspaceShift) => {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        let positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        if (positionToApply > this._getActualInputLength()) {
            positionToApply = this._getActualInputLength();
        }
        el.setSelectionRange(positionToApply, positionToApply);
        if ((this.maskExpression.includes('H') || this.maskExpression.includes('M')) && caretShift === 0) {
            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) + 1, ((/** @type {?} */ (el.selectionStart))) + 1);
        }
        this._position = null;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        /** @type {?} */
        const posStart = 0;
        /** @type {?} */
        const posEnd = 0;
        if (el !== null &&
            el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38)
            if (this._maskService.showMaskTyped) {
                // We are showing the mask in the input
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
                if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
                    // the input ONLY contains the mask, so position the cursor at the start
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
                else {
                    // the input contains some characters already
                    if (el.selectionStart > this._maskService.actualValue.length) {
                        // if the user clicked beyond our value's length, position the cursor at the end of our value
                        el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
                    }
                }
            }
        /** @type {?} */
        const nextValue = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
        if (el.value !== nextValue) {
            el.value = nextValue;
        }
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
        /** select only inserted text */
        if (((/** @type {?} */ (el.selectionEnd))) > this._getActualInputLength()) {
            el.selectionEnd = this._getActualInputLength();
        }
    }
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (e.keyCode === 8 && ((/** @type {?} */ (el.selectionStart))) !== 0) {
                // If specialChars is false, (shouldn't ever happen) then set to the defaults
                this.specialCharacters = this.specialCharacters || this._config.specialCharacters;
                if (this.prefix.length > 1 && ((/** @type {?} */ (el.selectionStart))) <= this.prefix.length) {
                    el.setSelectionRange(this.prefix.length, this.prefix.length);
                }
                else {
                    if (this._inputValue.length !== ((/** @type {?} */ (el.selectionStart))) && ((/** @type {?} */ (el.selectionStart))) !== 1) {
                        while (this.specialCharacters.includes(this._inputValue[((/** @type {?} */ (el.selectionStart))) - 1].toString()) &&
                            ((this.prefix.length >= 1 && ((/** @type {?} */ (el.selectionStart))) > this.prefix.length) ||
                                this.prefix.length === 0)) {
                            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
                        }
                    }
                    this.suffixCheckOnPressDelete(e.keyCode, el);
                }
            }
            this.suffixCheckOnPressDelete(e.keyCode, el);
            if (this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            /** @type {?} */
            const cursorStart = el.selectionStart;
            // this.onFocus(e);
            if (e.keyCode === 8 &&
                !el.readOnly &&
                cursorStart === 0 &&
                el.selectionEnd === el.value.length &&
                el.value.length !== 0) {
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
                this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
            }
        }
        if (!!this.suffix &&
            this.suffix.length > 1 &&
            this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
            el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
        else if ((e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+ A
            (e.keyCode === 65 && e.metaKey === true) // Cmd + A (Mac)
        ) {
            el.setSelectionRange(0, this._getActualInputLength());
            e.preventDefault();
        }
        this._maskService.selStart = el.selectionStart;
        this._maskService.selEnd = el.selectionEnd;
    }
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    writeValue(inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, /** @this {!MaskDirective} */ function* () {
            if (inputValue === undefined) {
                inputValue = '';
            }
            if (typeof inputValue === 'number') {
                inputValue = String(inputValue);
                inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                this._maskService.isNumberValue = true;
            }
            (inputValue && this._maskService.maskExpression) ||
                (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
                ? (this._maskService.formElementProperty = [
                    'value',
                    this._maskService.applyMask(inputValue, this._maskService.maskExpression),
                ])
                : (this._maskService.formElementProperty = ['value', inputValue]);
            this._inputValue = inputValue;
        });
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    suffixCheckOnPressDelete(keyCode, el) {
        if (keyCode === 46 && this.suffix.length > 0) {
            if (this._inputValue.length - this.suffix.length <= ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
        }
        if (keyCode === 8) {
            if (this.suffix.length > 1 && this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
            if (this.suffix.length === 1 && this._inputValue.length === ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
            }
        }
    }
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onModelChange(e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    }
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    _repeatPatternSymbols(maskExp) {
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            (accum, currval, index) => {
                this._start = currval === '{' ? index : this._start;
                if (currval !== '}') {
                    return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                this._end = index;
                /** @type {?} */
                const repeatNumber = Number(maskExp.slice(this._start + 1, this._end));
                /** @type {?} */
                const repaceWith = new Array(repeatNumber + 1).join(maskExp[this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    }
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    _applyMask() {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _validateTime(value) {
        /** @type {?} */
        const rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        (s) => s !== ':')).length;
        if (value === null || value.length === 0) {
            return null; // Don't validate empty values to allow for optional form control
        }
        if ((+value[value.length - 1] === 0 && value.length < rowMaskLen) || value.length <= rowMaskLen - 2) {
            return this._createValidationError(value);
        }
        return null;
    }
    /**
     * @private
     * @return {?}
     */
    _getActualInputLength() {
        return (this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length);
    }
    /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    _createValidationError(actualValue) {
        return {
            mask: {
                requiredMask: this._maskValue,
                actualValue,
            },
        };
    }
}
MaskDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MaskDirective)),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MaskDirective)),
                        multi: true,
                    },
                    MaskService,
                ],
            },] }
];
/** @nocollapse */
MaskDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: MaskService },
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
];
MaskDirective.propDecorators = {
    maskExpression: [{ type: Input, args: ['mask',] }],
    specialCharacters: [{ type: Input }],
    patterns: [{ type: Input }],
    prefix: [{ type: Input }],
    suffix: [{ type: Input }],
    thousandSeparator: [{ type: Input }],
    decimalMarker: [{ type: Input }],
    dropSpecialCharacters: [{ type: Input }],
    hiddenInput: [{ type: Input }],
    showMaskTyped: [{ type: Input }],
    placeHolderCharacter: [{ type: Input }],
    shownMaskExpression: [{ type: Input }],
    showTemplate: [{ type: Input }],
    clearIfNotMatch: [{ type: Input }],
    validation: [{ type: Input }],
    separatorLimit: [{ type: Input }],
    allowNegativeNumbers: [{ type: Input }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onFocus: [{ type: HostListener, args: ['click', ['$event'],] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onModelChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    MaskDirective.prototype.maskExpression;
    /** @type {?} */
    MaskDirective.prototype.specialCharacters;
    /** @type {?} */
    MaskDirective.prototype.patterns;
    /** @type {?} */
    MaskDirective.prototype.prefix;
    /** @type {?} */
    MaskDirective.prototype.suffix;
    /** @type {?} */
    MaskDirective.prototype.thousandSeparator;
    /** @type {?} */
    MaskDirective.prototype.decimalMarker;
    /** @type {?} */
    MaskDirective.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskDirective.prototype.hiddenInput;
    /** @type {?} */
    MaskDirective.prototype.showMaskTyped;
    /** @type {?} */
    MaskDirective.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskDirective.prototype.shownMaskExpression;
    /** @type {?} */
    MaskDirective.prototype.showTemplate;
    /** @type {?} */
    MaskDirective.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskDirective.prototype.validation;
    /** @type {?} */
    MaskDirective.prototype.separatorLimit;
    /** @type {?} */
    MaskDirective.prototype.allowNegativeNumbers;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._inputValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._position;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._start;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._end;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._code;
    /** @type {?} */
    MaskDirective.prototype.onChange;
    /** @type {?} */
    MaskDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskService;
    /**
     * @type {?}
     * @protected
     */
    MaskDirective.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQW1CN0MsTUFBTSxPQUFPLGFBQWE7Ozs7OztJQXlCeEIsWUFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBM0J0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJ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Q0FBbUQ7O0lBQ25ELCtCQUErQzs7SUFDL0MsK0JBQStDOztJQUMvQywwQ0FBc0U7O0lBQ3RFLHNDQUE4RDs7SUFDOUQsOENBQXNGOztJQUN0RixvQ0FBa0U7O0lBQ2xFLHNDQUFzRTs7SUFDdEUsNkNBQW9GOztJQUNwRiw0Q0FBa0Y7O0lBQ2xGLHFDQUFvRTs7SUFDcEUsd0NBQTBFOztJQUMxRSxtQ0FBZ0U7O0lBQ2hFLHVDQUF3RTs7SUFDeEUsNkNBQW9GOzs7OztJQUNwRixtQ0FBZ0M7Ozs7O0lBQ2hDLG9DQUE2Qjs7Ozs7SUFDN0Isa0NBQXdDOzs7OztJQUN4QywrQkFBd0I7Ozs7O0lBQ3hCLDZCQUFzQjs7Ozs7SUFDdEIsOEJBQXVCOztJQVF2QixpQ0FBaUM7O0lBQ2pDLGdDQUEwQjs7Ozs7SUFOeEIsaUNBQXVDOzs7OztJQUN2QyxxQ0FBaUM7Ozs7O0lBQ2pDLGdDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEN1c3RvbUtleWJvYXJkRXZlbnQgfSBmcm9tICcuL2N1c3RvbS1rZXlib2FyZC1ldmVudCc7XG5pbXBvcnQgeyBjb25maWcsIElDb25maWcsIHRpbWVNYXNrcywgd2l0aG91dFZhbGlkYXRpb24gfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYXNrU2VydmljZSB9IGZyb20gJy4vbWFzay5zZXJ2aWNlJztcblxuLy8gdHNsaW50OmRpc2FibGUgZGVwcmVjYXRpb25cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXNrXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWFza0RpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXNrRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgTWFza1NlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hc2tEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCdtYXNrJykgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcHVibGljIHNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuczogSUNvbmZpZ1sncGF0dGVybnMnXSA9IHt9O1xuICBASW5wdXQoKSBwdWJsaWMgcHJlZml4OiBJQ29uZmlnWydwcmVmaXgnXSA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgc3VmZml4OiBJQ29uZmlnWydzdWZmaXgnXSA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgdGhvdXNhbmRTZXBhcmF0b3I6IElDb25maWdbJ3Rob3VzYW5kU2VwYXJhdG9yJ10gPSAnICc7XG4gIEBJbnB1dCgpIHB1YmxpYyBkZWNpbWFsTWFya2VyOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ10gPSAnLic7XG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ2Ryb3BTcGVjaWFsQ2hhcmFjdGVycyddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRkZW5JbnB1dDogSUNvbmZpZ1snaGlkZGVuSW5wdXQnXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01hc2tUeXBlZDogSUNvbmZpZ1snc2hvd01hc2tUeXBlZCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3RlcjogSUNvbmZpZ1sncGxhY2VIb2xkZXJDaGFyYWN0ZXInXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd25NYXNrRXhwcmVzc2lvbjogSUNvbmZpZ1snc2hvd25NYXNrRXhwcmVzc2lvbiddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93VGVtcGxhdGU6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcklmTm90TWF0Y2g6IElDb25maWdbJ2NsZWFySWZOb3RNYXRjaCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0aW9uOiBJQ29uZmlnWyd2YWxpZGF0aW9uJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvckxpbWl0OiBJQ29uZmlnWydzZXBhcmF0b3JMaW1pdCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd05lZ2F0aXZlTnVtYmVyczogSUNvbmZpZ1snYWxsb3dOZWdhdGl2ZU51bWJlcnMnXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9tYXNrVmFsdWU6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9pbnB1dFZhbHVlITogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3N0YXJ0ITogbnVtYmVyO1xuICBwcml2YXRlIF9lbmQhOiBudW1iZXI7XG4gIHByaXZhdGUgX2NvZGUhOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIF9tYXNrU2VydmljZTogTWFza1NlcnZpY2UsXG4gICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnXG4gICkge31cblxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7fTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHtcbiAgICAgIG1hc2tFeHByZXNzaW9uLFxuICAgICAgc3BlY2lhbENoYXJhY3RlcnMsXG4gICAgICBwYXR0ZXJucyxcbiAgICAgIHByZWZpeCxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbE1hcmtlcixcbiAgICAgIGRyb3BTcGVjaWFsQ2hhcmFjdGVycyxcbiAgICAgIGhpZGRlbklucHV0LFxuICAgICAgc2hvd01hc2tUeXBlZCxcbiAgICAgIHBsYWNlSG9sZGVyQ2hhcmFjdGVyLFxuICAgICAgc2hvd25NYXNrRXhwcmVzc2lvbixcbiAgICAgIHNob3dUZW1wbGF0ZSxcbiAgICAgIGNsZWFySWZOb3RNYXRjaCxcbiAgICAgIHZhbGlkYXRpb24sXG4gICAgICBzZXBhcmF0b3JMaW1pdCxcbiAgICAgIGFsbG93TmVnYXRpdmVOdW1iZXJzLFxuICAgIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChtYXNrRXhwcmVzc2lvbikge1xuICAgICAgdGhpcy5fbWFza1ZhbHVlID0gY2hhbmdlcy5tYXNrRXhwcmVzc2lvbi5jdXJyZW50VmFsdWUgfHwgJyc7XG4gICAgfVxuICAgIGlmIChzcGVjaWFsQ2hhcmFjdGVycykge1xuICAgICAgaWYgKCFzcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUgfHwgIUFycmF5LmlzQXJyYXkoc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSBjaGFuZ2VzLnNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSB8fCBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gT25seSBvdmVyd3JpdGUgdGhlIG1hc2sgYXZhaWxhYmxlIHBhdHRlcm5zIGlmIGEgcGF0dGVybiBoYXMgYWN0dWFsbHkgYmVlbiBwYXNzZWQgaW5cbiAgICBpZiAocGF0dGVybnMgJiYgcGF0dGVybnMuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSBwYXR0ZXJucy5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA9IHByZWZpeC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzdWZmaXgpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnN1ZmZpeCA9IHN1ZmZpeC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmICh0aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudGhvdXNhbmRTZXBhcmF0b3IgPSB0aG91c2FuZFNlcGFyYXRvci5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChkZWNpbWFsTWFya2VyKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5kZWNpbWFsTWFya2VyID0gZGVjaW1hbE1hcmtlci5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChkcm9wU3BlY2lhbENoYXJhY3RlcnMpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9IGRyb3BTcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChoaWRkZW5JbnB1dCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuaGlkZGVuSW5wdXQgPSBoaWRkZW5JbnB1dC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza1R5cGVkID0gc2hvd01hc2tUeXBlZC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChwbGFjZUhvbGRlckNoYXJhY3Rlcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UucGxhY2VIb2xkZXJDaGFyYWN0ZXIgPSBwbGFjZUhvbGRlckNoYXJhY3Rlci5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzaG93bk1hc2tFeHByZXNzaW9uKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93bk1hc2tFeHByZXNzaW9uID0gc2hvd25NYXNrRXhwcmVzc2lvbi5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzaG93VGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3dUZW1wbGF0ZSA9IHNob3dUZW1wbGF0ZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjbGVhcklmTm90TWF0Y2gpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCA9IGNsZWFySWZOb3RNYXRjaC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmICh2YWxpZGF0aW9uKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS52YWxpZGF0aW9uID0gdmFsaWRhdGlvbi5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzZXBhcmF0b3JMaW1pdCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VwYXJhdG9yTGltaXQgPSBzZXBhcmF0b3JMaW1pdC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChhbGxvd05lZ2F0aXZlTnVtYmVycykge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fbWFza1NlcnZpY2UubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmZpbHRlcigoYzogc3RyaW5nKSA9PiBjICE9PSAnLScpO1xuICAgIH1cbiAgICB0aGlzLl9hcHBseU1hc2soKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3ljbG9tYXRpYy1jb21wbGV4aXR5XG4gIHB1YmxpYyB2YWxpZGF0ZSh7IHZhbHVlIH06IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGlmICghdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5pcEVycm9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh3aXRob3V0VmFsaWRhdGlvbi5pbmNsdWRlcyh0aGlzLl9tYXNrVmFsdWUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aW1lTWFza3MuaW5jbHVkZXModGhpcy5fbWFza1ZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlVGltZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgY291bnRlck9mT3B0ID0gMDtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJucykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zW2tleV0ub3B0aW9uYWwgJiZcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnNba2V5XS5vcHRpb25hbCA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gdGhpcy5fbWFza1ZhbHVlLmxhc3RJbmRleE9mKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdDogc3RyaW5nID0gdGhpcy5fbWFza1ZhbHVlXG4gICAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgICAgLmZpbHRlcigoaTogc3RyaW5nKSA9PiBpID09PSBrZXkpXG4gICAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCArPSBvcHQubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gdGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb3VudGVyT2ZPcHQgPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZigneycpID09PSAxICYmXG4gICAgICAgIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID09PSB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoICsgTnVtYmVyKHRoaXMuX21hc2tWYWx1ZS5zcGxpdCgneycpWzFdLnNwbGl0KCd9JylbMF0pIC0gNFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPT09IDEgfHwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykpIHx8XG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykpIHx8XG4gICAgICAgIHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCd7JykgPT09IDFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID09PSAtMSB8fCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID09PSAtMSkge1xuICAgICAgICBjb25zdCBsZW5ndGg6IG51bWJlciA9IHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVyc1xuICAgICAgICAgID8gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIHRoaXMuX21hc2tTZXJ2aWNlLmNoZWNrU3BlY2lhbENoYXJBbW91bnQodGhpcy5fbWFza1ZhbHVlKSAtIGNvdW50ZXJPZk9wdFxuICAgICAgICAgIDogdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIGNvdW50ZXJPZk9wdDtcbiAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVZhbGlkYXRpb25FcnJvcih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbklucHV0KGU6IEN1c3RvbUtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgIGlmICghdGhpcy5fbWFza1ZhbHVlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGVsLnZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9XG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9PT0gMVxuICAgICAgICA/IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICAgICA6IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgIGxldCBjYXJldFNoaWZ0ID0gMDtcbiAgICBsZXQgYmFja3NwYWNlU2hpZnQgPSBmYWxzZTtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseVZhbHVlQ2hhbmdlcyhwb3NpdGlvbiwgKHNoaWZ0OiBudW1iZXIsIF9iYWNrc3BhY2VTaGlmdDogYm9vbGVhbikgPT4ge1xuICAgICAgY2FyZXRTaGlmdCA9IHNoaWZ0O1xuICAgICAgYmFja3NwYWNlU2hpZnQgPSBfYmFja3NwYWNlU2hpZnQ7XG4gICAgfSk7XG4gICAgLy8gb25seSBzZXQgdGhlIHNlbGVjdGlvbiBpZiB0aGUgZWxlbWVudCBpcyBhY3RpdmVcbiAgICBpZiAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uID09PSAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoID09PSAxID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xuICAgIGxldCBwb3NpdGlvblRvQXBwbHk6IG51bWJlciA9IHRoaXMuX3Bvc2l0aW9uXG4gICAgICA/IHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoICsgcG9zaXRpb24gKyBjYXJldFNoaWZ0XG4gICAgICA6IHBvc2l0aW9uICsgKHRoaXMuX2NvZGUgPT09ICdCYWNrc3BhY2UnICYmICFiYWNrc3BhY2VTaGlmdCA/IDAgOiBjYXJldFNoaWZ0KTtcbiAgICBpZiAocG9zaXRpb25Ub0FwcGx5ID4gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSkge1xuICAgICAgcG9zaXRpb25Ub0FwcGx5ID0gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKTtcbiAgICB9XG4gICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UocG9zaXRpb25Ub0FwcGx5LCBwb3NpdGlvblRvQXBwbHkpO1xuICAgIGlmICgodGhpcy5tYXNrRXhwcmVzc2lvbi5pbmNsdWRlcygnSCcpIHx8IHRoaXMubWFza0V4cHJlc3Npb24uaW5jbHVkZXMoJ00nKSkgJiYgY2FyZXRTaGlmdCA9PT0gMCkge1xuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEpO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2hGbigpO1xuICAgIHRoaXMub25Ub3VjaCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Gb2N1cyhlOiBNb3VzZUV2ZW50IHwgQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBwb3NTdGFydCA9IDA7XG4gICAgY29uc3QgcG9zRW5kID0gMDtcbiAgICBpZiAoXG4gICAgICBlbCAhPT0gbnVsbCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgIT09IG51bGwgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSBlbC5zZWxlY3Rpb25FbmQgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAoZSBhcyBhbnkpLmtleUNvZGUgIT09IDM4XG4gICAgKVxuICAgICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgICAgLy8gV2UgYXJlIHNob3dpbmcgdGhlIG1hc2sgaW4gdGhlIGlucHV0XG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID0gdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tJbklucHV0KCk7XG4gICAgICAgIGlmIChlbC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggKyB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9PT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAvLyB0aGUgaW5wdXQgT05MWSBjb250YWlucyB0aGUgbWFzaywgc28gcG9zaXRpb24gdGhlIGN1cnNvciBhdCB0aGUgc3RhcnRcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHBvc1N0YXJ0LCBwb3NFbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoZSBpbnB1dCBjb250YWlucyBzb21lIGNoYXJhY3RlcnMgYWxyZWFkeVxuICAgICAgICAgIGlmIChlbC5zZWxlY3Rpb25TdGFydCA+IHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHVzZXIgY2xpY2tlZCBiZXlvbmQgb3VyIHZhbHVlJ3MgbGVuZ3RoLCBwb3NpdGlvbiB0aGUgY3Vyc29yIGF0IHRoZSBlbmQgb2Ygb3VyIHZhbHVlXG4gICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgsIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgY29uc3QgbmV4dFZhbHVlOiBzdHJpbmcgfCBudWxsID1cbiAgICAgICFlbC52YWx1ZSB8fCBlbC52YWx1ZSA9PT0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4XG4gICAgICAgID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ICsgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd25cbiAgICAgICAgOiBlbC52YWx1ZTtcblxuICAgIC8qKiBGaXggb2YgY3Vyc29yIHBvc2l0aW9uIGp1bXBpbmcgdG8gZW5kIGluIG1vc3QgYnJvd3NlcnMgbm8gbWF0dGVyIHdoZXJlIGN1cnNvciBpcyBpbnNlcnRlZCBvbkZvY3VzICovXG4gICAgaWYgKGVsLnZhbHVlICE9PSBuZXh0VmFsdWUpIHtcbiAgICAgIGVsLnZhbHVlID0gbmV4dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBmaXggb2YgY3Vyc29yIHBvc2l0aW9uIHdpdGggcHJlZml4IHdoZW4gbW91c2UgY2xpY2sgb2NjdXIgKi9cbiAgICBpZiAoKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIHx8IChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSkgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCkge1xuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKiBzZWxlY3Qgb25seSBpbnNlcnRlZCB0ZXh0ICovXG4gICAgaWYgKChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA+IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCkpIHtcbiAgICAgIGVsLnNlbGVjdGlvbkVuZCA9IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHlcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleURvd24oZTogQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NvZGUgPSBlLmNvZGUgPyBlLmNvZGUgOiBlLmtleTtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gOCB8fCBlLmtleUNvZGUgPT09IDQ2KSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4ICYmIGVsLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZDtcbiAgICAgIH1cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDggJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgIT09IDApIHtcbiAgICAgICAgLy8gSWYgc3BlY2lhbENoYXJzIGlzIGZhbHNlLCAoc2hvdWxkbid0IGV2ZXIgaGFwcGVuKSB0aGVuIHNldCB0byB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5zcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuc3BlY2lhbENoYXJhY3RlcnMgfHwgdGhpcy5fY29uZmlnLnNwZWNpYWxDaGFyYWN0ZXJzO1xuICAgICAgICBpZiAodGhpcy5wcmVmaXgubGVuZ3RoID4gMSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLnByZWZpeC5sZW5ndGgpIHtcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLnByZWZpeC5sZW5ndGgsIHRoaXMucHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoICE9PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAhPT0gMSkge1xuICAgICAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzLmluY2x1ZGVzKHRoaXMuX2lucHV0VmFsdWVbKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxXS50b1N0cmluZygpKSAmJlxuICAgICAgICAgICAgICAoKHRoaXMucHJlZml4Lmxlbmd0aCA+PSAxICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpID4gdGhpcy5wcmVmaXgubGVuZ3RoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMucHJlZml4Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3VmZml4Q2hlY2tPblByZXNzRGVsZXRlKGUua2V5Q29kZSwgZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShlLmtleUNvZGUsIGVsKTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgICAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXG4gICAgICAgIChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgY3Vyc29yU3RhcnQ6IG51bWJlciB8IG51bGwgPSBlbC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIC8vIHRoaXMub25Gb2N1cyhlKTtcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA4ICYmXG4gICAgICAgICFlbC5yZWFkT25seSAmJlxuICAgICAgICBjdXJzb3JTdGFydCA9PT0gMCAmJlxuICAgICAgICBlbC5zZWxlY3Rpb25FbmQgPT09IGVsLnZhbHVlLmxlbmd0aCAmJlxuICAgICAgICBlbC52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA/IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggOiAwO1xuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2sodGhpcy5fbWFza1NlcnZpY2UucHJlZml4LCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiwgdGhpcy5fcG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICAhIXRoaXMuc3VmZml4ICYmXG4gICAgICB0aGlzLnN1ZmZpeC5sZW5ndGggPiAxICYmXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpXG4gICAgKSB7XG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoZS5rZXlDb2RlID09PSA2NSAmJiBlLmN0cmxLZXkgPT09IHRydWUpIHx8IC8vIEN0cmwrIEFcbiAgICAgIChlLmtleUNvZGUgPT09IDY1ICYmIGUubWV0YUtleSA9PT0gdHJ1ZSkgLy8gQ21kICsgQSAoTWFjKVxuICAgICkge1xuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlbFN0YXJ0ID0gZWwuc2VsZWN0aW9uU3RhcnQ7XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VsRW5kID0gZWwuc2VsZWN0aW9uRW5kO1xuICB9XG5cbiAgLyoqIEl0IHdyaXRlcyB0aGUgdmFsdWUgaW4gdGhlIGlucHV0ICovXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKGlucHV0VmFsdWU6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlucHV0VmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnB1dFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaW5wdXRWYWx1ZSA9IFN0cmluZyhpbnB1dFZhbHVlKTtcbiAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmRlY2ltYWxNYXJrZXIgIT09ICcuJyA/IGlucHV0VmFsdWUucmVwbGFjZSgnLicsIHRoaXMuZGVjaW1hbE1hcmtlcikgOiBpbnB1dFZhbHVlO1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuaXNOdW1iZXJWYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIChpbnB1dFZhbHVlICYmIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSB8fFxuICAgICh0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiAmJiAodGhpcy5fbWFza1NlcnZpY2UucHJlZml4IHx8IHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpKVxuICAgICAgPyAodGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFtcbiAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhpbnB1dFZhbHVlLCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiksXG4gICAgICAgIF0pXG4gICAgICA6ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gWyd2YWx1ZScsIGlucHV0VmFsdWVdKTtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzdWZmaXhDaGVja09uUHJlc3NEZWxldGUoa2V5Q29kZTogbnVtYmVyLCBlbDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChrZXlDb2RlID09PSA0NiAmJiB0aGlzLnN1ZmZpeC5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPD0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGtleUNvZGUgPT09IDgpIHtcbiAgICAgIGlmICh0aGlzLnN1ZmZpeC5sZW5ndGggPiAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoIDwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN1ZmZpeC5sZW5ndGggPT09IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggPT09IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpKSB7XG4gICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogSXQgZGlzYWJsZXMgdGhlIGlucHV0IGVsZW1lbnQgKi9cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ2Rpc2FibGVkJywgaXNEaXNhYmxlZF07XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnlcbiAgcHVibGljIG9uTW9kZWxDaGFuZ2UoZTogYW55KTogdm9pZCB7XG4gICAgaWYgKCFlKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlcGVhdFBhdHRlcm5TeW1ib2xzKG1hc2tFeHA6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIChtYXNrRXhwLm1hdGNoKC97WzAtOV0rfS8pICYmXG4gICAgICAgIG1hc2tFeHAuc3BsaXQoJycpLnJlZHVjZSgoYWNjdW06IHN0cmluZywgY3VycnZhbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICB0aGlzLl9zdGFydCA9IGN1cnJ2YWwgPT09ICd7JyA/IGluZGV4IDogdGhpcy5fc3RhcnQ7XG5cbiAgICAgICAgICBpZiAoY3VycnZhbCAhPT0gJ30nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFza1NlcnZpY2UuX2ZpbmRTcGVjaWFsQ2hhcihjdXJydmFsKSA/IGFjY3VtICsgY3VycnZhbCA6IGFjY3VtO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbmQgPSBpbmRleDtcbiAgICAgICAgICBjb25zdCByZXBlYXROdW1iZXI6IG51bWJlciA9IE51bWJlcihtYXNrRXhwLnNsaWNlKHRoaXMuX3N0YXJ0ICsgMSwgdGhpcy5fZW5kKSk7XG4gICAgICAgICAgY29uc3QgcmVwYWNlV2l0aDogc3RyaW5nID0gbmV3IEFycmF5KHJlcGVhdE51bWJlciArIDEpLmpvaW4obWFza0V4cFt0aGlzLl9zdGFydCAtIDFdKTtcbiAgICAgICAgICByZXR1cm4gYWNjdW0gKyByZXBhY2VXaXRoO1xuICAgICAgICB9LCAnJykpIHx8XG4gICAgICBtYXNrRXhwXG4gICAgKTtcbiAgfVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHByaXZhdGUgX2FwcGx5TWFzaygpOiBhbnkge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uID0gdGhpcy5fcmVwZWF0UGF0dGVyblN5bWJvbHModGhpcy5fbWFza1ZhbHVlIHx8ICcnKTtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgJ3ZhbHVlJyxcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayh0aGlzLl9pbnB1dFZhbHVlLCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiksXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlVGltZSh2YWx1ZTogc3RyaW5nKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGNvbnN0IHJvd01hc2tMZW46IG51bWJlciA9IHRoaXMuX21hc2tWYWx1ZS5zcGxpdCgnJykuZmlsdGVyKChzOiBzdHJpbmcpID0+IHMgIT09ICc6JykubGVuZ3RoO1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsOyAvLyBEb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgZm9yIG9wdGlvbmFsIGZvcm0gY29udHJvbFxuICAgIH1cblxuICAgIGlmICgoK3ZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdID09PSAwICYmIHZhbHVlLmxlbmd0aCA8IHJvd01hc2tMZW4pIHx8IHZhbHVlLmxlbmd0aCA8PSByb3dNYXNrTGVuIC0gMikge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVZhbGlkYXRpb25FcnJvcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRBY3R1YWxJbnB1dExlbmd0aCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoIHx8IHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCArIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGhcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVmFsaWRhdGlvbkVycm9yKGFjdHVhbFZhbHVlOiBzdHJpbmcpOiBWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWFzazoge1xuICAgICAgICByZXF1aXJlZE1hc2s6IHRoaXMuX21hc2tWYWx1ZSxcbiAgICAgICAgYWN0dWFsVmFsdWUsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==