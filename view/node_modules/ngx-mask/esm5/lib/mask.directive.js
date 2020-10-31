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
var MaskDirective = /** @class */ (function () {
    function MaskDirective(document, _maskService, _config) {
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
        function (_) { });
        this.onTouch = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaskDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var maskExpression = changes.maskExpression, specialCharacters = changes.specialCharacters, patterns = changes.patterns, prefix = changes.prefix, suffix = changes.suffix, thousandSeparator = changes.thousandSeparator, decimalMarker = changes.decimalMarker, dropSpecialCharacters = changes.dropSpecialCharacters, hiddenInput = changes.hiddenInput, showMaskTyped = changes.showMaskTyped, placeHolderCharacter = changes.placeHolderCharacter, shownMaskExpression = changes.shownMaskExpression, showTemplate = changes.showTemplate, clearIfNotMatch = changes.clearIfNotMatch, validation = changes.validation, separatorLimit = changes.separatorLimit, allowNegativeNumbers = changes.allowNegativeNumbers;
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
            function (c) { return c !== '-'; }));
        }
        this._applyMask();
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    MaskDirective.prototype.validate = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a.value;
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
            var counterOfOpt = 0;
            var _loop_1 = function (key) {
                if (this_1._maskService.maskAvailablePatterns[key].optional &&
                    this_1._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this_1._maskValue.indexOf(key) !== this_1._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        var opt = this_1._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i === key; }))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this_1._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this_1._maskValue.indexOf(key) !== -1 && value.toString().length >= this_1._maskValue.indexOf(key)) {
                        return { value: null };
                    }
                    if (counterOfOpt === this_1._maskValue.length) {
                        return { value: null };
                    }
                }
            };
            var this_1 = this;
            for (var key in this._maskService.maskAvailablePatterns) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
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
                var length_1 = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length_1) {
                    return this._createValidationError(value);
                }
            }
        }
        return null;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        var caretShift = 0;
        /** @type {?} */
        var backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        function (shift, _backspaceShift) {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        var positionToApply = this._position
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
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        /** @type {?} */
        var posStart = 0;
        /** @type {?} */
        var posEnd = 0;
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
        var nextValue = !el.value || el.value === this._maskService.prefix
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
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onKeyDown = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
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
            var cursorStart = el.selectionStart;
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
    };
    /** It writes the value in the input */
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    MaskDirective.prototype.suffixCheckOnPressDelete = /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    function (keyCode, el) {
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
    };
    /** It disables the input element */
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onModelChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    };
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    MaskDirective.prototype._repeatPatternSymbols = /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    function (maskExp) {
        var _this = this;
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            function (accum, currval, index) {
                _this._start = currval === '{' ? index : _this._start;
                if (currval !== '}') {
                    return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                _this._end = index;
                /** @type {?} */
                var repeatNumber = Number(maskExp.slice(_this._start + 1, _this._end));
                /** @type {?} */
                var repaceWith = new Array(repeatNumber + 1).join(maskExp[_this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._applyMask = 
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    function () {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskDirective.prototype._validateTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s !== ':'; })).length;
        if (value === null || value.length === 0) {
            return null; // Don't validate empty values to allow for optional form control
        }
        if ((+value[value.length - 1] === 0 && value.length < rowMaskLen) || value.length <= rowMaskLen - 2) {
            return this._createValidationError(value);
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._getActualInputLength = /**
     * @private
     * @return {?}
     */
    function () {
        return (this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length);
    };
    /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    MaskDirective.prototype._createValidationError = /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    function (actualValue) {
        return {
            mask: {
                requiredMask: this._maskValue,
                actualValue: actualValue,
            },
        };
    };
    MaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        MaskService,
                    ],
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: MaskService },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
    ]; };
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
    return MaskDirective;
}());
export { MaskDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc3QztJQXlDRSx1QkFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBM0J0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJLENBQUM7UUFDbEUsaUJBQVksR0FB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QyxZQUFZLFNBQUMsTUFBTTswQkFNbkIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFtRGhDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBc0hsQyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQTZEM0Msb0JBQUM7Q0FBQSxBQXhkRCxJQXdkQztTQXhjWSxhQUFhOzs7SUFDeEIsdUNBQWtEOztJQUNsRCwwQ0FBcUU7O0lBQ3JFLGlDQUFtRDs7SUFDbkQsK0JBQStDOztJQUMvQywrQkFBK0M7O0lBQy9DLDBDQUFzRTs7SUFDdEUsc0NBQThEOztJQUM5RCw4Q0FBc0Y7O0lBQ3RGLG9DQUFrRTs7SUFDbEUsc0NBQXNFOztJQUN0RSw2Q0FBb0Y7O0lBQ3BGLDRDQUFrRjs7SUFDbEYscUNBQW9FOztJQUNwRSx3Q0FBMEU7O0lBQzFFLG1DQUFnRTs7SUFDaEUsdUNBQXdFOztJQUN4RSw2Q0FBb0Y7Ozs7O0lBQ3BGLG1DQUFnQzs7Ozs7SUFDaEMsb0NBQTZCOzs7OztJQUM3QixrQ0FBd0M7Ozs7O0lBQ3hDLCtCQUF3Qjs7Ozs7SUFDeEIsNkJBQXNCOzs7OztJQUN0Qiw4QkFBdUI7O0lBUXZCLGlDQUFpQzs7SUFDakMsZ0NBQTBCOzs7OztJQU54QixpQ0FBdUM7Ozs7O0lBQ3ZDLHFDQUFpQzs7Ozs7SUFDakMsZ0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ3VzdG9tS2V5Ym9hcmRFdmVudCB9IGZyb20gJy4vY3VzdG9tLWtleWJvYXJkLWV2ZW50JztcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZywgdGltZU1hc2tzLCB3aXRob3V0VmFsaWRhdGlvbiB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1hc2tTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZSBkZXByZWNhdGlvblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hc2tdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXNrRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICBNYXNrU2VydmljZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFza0RpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuICBASW5wdXQoJ21hc2snKSBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgc3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ10gPSBbXTtcbiAgQElucHV0KCkgcHVibGljIHBhdHRlcm5zOiBJQ29uZmlnWydwYXR0ZXJucyddID0ge307XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVmaXg6IElDb25maWdbJ3ByZWZpeCddID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdWZmaXg6IElDb25maWdbJ3N1ZmZpeCddID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0aG91c2FuZFNlcGFyYXRvcjogSUNvbmZpZ1sndGhvdXNhbmRTZXBhcmF0b3InXSA9ICcgJztcbiAgQElucHV0KCkgcHVibGljIGRlY2ltYWxNYXJrZXI6IElDb25maWdbJ2RlY2ltYWxNYXJrZXInXSA9ICcuJztcbiAgQElucHV0KCkgcHVibGljIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIGhpZGRlbklucHV0OiBJQ29uZmlnWydoaWRkZW5JbnB1dCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TWFza1R5cGVkOiBJQ29uZmlnWydzaG93TWFza1R5cGVkJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHBsYWNlSG9sZGVyQ2hhcmFjdGVyOiBJQ29uZmlnWydwbGFjZUhvbGRlckNoYXJhY3RlciddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93bk1hc2tFeHByZXNzaW9uOiBJQ29uZmlnWydzaG93bk1hc2tFeHByZXNzaW9uJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHNob3dUZW1wbGF0ZTogSUNvbmZpZ1snc2hvd1RlbXBsYXRlJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIGNsZWFySWZOb3RNYXRjaDogSUNvbmZpZ1snY2xlYXJJZk5vdE1hdGNoJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHZhbGlkYXRpb246IElDb25maWdbJ3ZhbGlkYXRpb24nXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yTGltaXQ6IElDb25maWdbJ3NlcGFyYXRvckxpbWl0J10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIGFsbG93TmVnYXRpdmVOdW1iZXJzOiBJQ29uZmlnWydhbGxvd05lZ2F0aXZlTnVtYmVycyddIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX21hc2tWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2lucHV0VmFsdWUhOiBzdHJpbmc7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfc3RhcnQhOiBudW1iZXI7XG4gIHByaXZhdGUgX2VuZCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY29kZSE6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgX21hc2tTZXJ2aWNlOiBNYXNrU2VydmljZSxcbiAgICBASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWdcbiAgKSB7fVxuXG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHt9O1xuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgbWFza0V4cHJlc3Npb24sXG4gICAgICBzcGVjaWFsQ2hhcmFjdGVycyxcbiAgICAgIHBhdHRlcm5zLFxuICAgICAgcHJlZml4LFxuICAgICAgc3VmZml4LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsTWFya2VyLFxuICAgICAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzLFxuICAgICAgaGlkZGVuSW5wdXQsXG4gICAgICBzaG93TWFza1R5cGVkLFxuICAgICAgcGxhY2VIb2xkZXJDaGFyYWN0ZXIsXG4gICAgICBzaG93bk1hc2tFeHByZXNzaW9uLFxuICAgICAgc2hvd1RlbXBsYXRlLFxuICAgICAgY2xlYXJJZk5vdE1hdGNoLFxuICAgICAgdmFsaWRhdGlvbixcbiAgICAgIHNlcGFyYXRvckxpbWl0LFxuICAgICAgYWxsb3dOZWdhdGl2ZU51bWJlcnMsXG4gICAgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG1hc2tFeHByZXNzaW9uKSB7XG4gICAgICB0aGlzLl9tYXNrVmFsdWUgPSBjaGFuZ2VzLm1hc2tFeHByZXNzaW9uLmN1cnJlbnRWYWx1ZSB8fCAnJztcbiAgICB9XG4gICAgaWYgKHNwZWNpYWxDaGFyYWN0ZXJzKSB7XG4gICAgICBpZiAoIXNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSB8fCAhQXJyYXkuaXNBcnJheShzcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IGNoYW5nZXMuc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlIHx8IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPbmx5IG92ZXJ3cml0ZSB0aGUgbWFzayBhdmFpbGFibGUgcGF0dGVybnMgaWYgYSBwYXR0ZXJuIGhhcyBhY3R1YWxseSBiZWVuIHBhc3NlZCBpblxuICAgIGlmIChwYXR0ZXJucyAmJiBwYXR0ZXJucy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHBhdHRlcm5zLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHByZWZpeCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ID0gcHJlZml4LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHN1ZmZpeCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc3VmZml4ID0gc3VmZml4LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHRob3VzYW5kU2VwYXJhdG9yKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS50aG91c2FuZFNlcGFyYXRvciA9IHRob3VzYW5kU2VwYXJhdG9yLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGRlY2ltYWxNYXJrZXIpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmRlY2ltYWxNYXJrZXIgPSBkZWNpbWFsTWFya2VyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGRyb3BTcGVjaWFsQ2hhcmFjdGVycykge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID0gZHJvcFNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGhpZGRlbklucHV0KSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5oaWRkZW5JbnB1dCA9IGhpZGRlbklucHV0LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQgPSBzaG93TWFza1R5cGVkLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHBsYWNlSG9sZGVyQ2hhcmFjdGVyKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5wbGFjZUhvbGRlckNoYXJhY3RlciA9IHBsYWNlSG9sZGVyQ2hhcmFjdGVyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHNob3duTWFza0V4cHJlc3Npb24pIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3duTWFza0V4cHJlc3Npb24gPSBzaG93bk1hc2tFeHByZXNzaW9uLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHNob3dUZW1wbGF0ZSkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd1RlbXBsYXRlID0gc2hvd1RlbXBsYXRlLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNsZWFySWZOb3RNYXRjaCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoID0gY2xlYXJJZk5vdE1hdGNoLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbGlkYXRpb24pIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHNlcGFyYXRvckxpbWl0KSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zZXBhcmF0b3JMaW1pdCA9IHNlcGFyYXRvckxpbWl0LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93TmVnYXRpdmVOdW1iZXJzKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChjOiBzdHJpbmcpID0+IGMgIT09ICctJyk7XG4gICAgfVxuICAgIHRoaXMuX2FwcGx5TWFzaygpO1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHlcbiAgcHVibGljIHZhbGlkYXRlKHsgdmFsdWUgfTogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLl9tYXNrU2VydmljZS52YWxpZGF0aW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLmlwRXJyb3IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVWYWxpZGF0aW9uRXJyb3IodmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbWFza1ZhbHVlLnN0YXJ0c1dpdGgoJ3NlcGFyYXRvcicpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHdpdGhvdXRWYWxpZGF0aW9uLmluY2x1ZGVzKHRoaXMuX21hc2tWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRpbWVNYXNrcy5pbmNsdWRlcyh0aGlzLl9tYXNrVmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVUaW1lKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49IDEpIHtcbiAgICAgIGxldCBjb3VudGVyT2ZPcHQgPSAwO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnNba2V5XS5vcHRpb25hbCAmJlxuICAgICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1trZXldLm9wdGlvbmFsID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSB0aGlzLl9tYXNrVmFsdWUubGFzdEluZGV4T2Yoa2V5KSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0OiBzdHJpbmcgPSB0aGlzLl9tYXNrVmFsdWVcbiAgICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgICAuZmlsdGVyKChpOiBzdHJpbmcpID0+IGkgPT09IGtleSlcbiAgICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICAgICAgY291bnRlck9mT3B0ICs9IG9wdC5sZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgY291bnRlck9mT3B0Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSAtMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvdW50ZXJPZk9wdCA9PT0gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCd7JykgPT09IDEgJiZcbiAgICAgICAgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGggKyBOdW1iZXIodGhpcy5fbWFza1ZhbHVlLnNwbGl0KCd7JylbMV0uc3BsaXQoJ30nKVswXSkgLSA0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJyonKSA9PT0gMSB8fCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPiAxICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJyonKSkgfHxcbiAgICAgICAgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykgPiAxICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSkgfHxcbiAgICAgICAgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJ3snKSA9PT0gMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVWYWxpZGF0aW9uRXJyb3IodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPT09IC0xIHx8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykgPT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5fbWFza1NlcnZpY2UuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzXG4gICAgICAgICAgPyB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoIC0gdGhpcy5fbWFza1NlcnZpY2UuY2hlY2tTcGVjaWFsQ2hhckFtb3VudCh0aGlzLl9tYXNrVmFsdWUpIC0gY291bnRlck9mT3B0XG4gICAgICAgICAgOiB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoIC0gY291bnRlck9mT3B0O1xuICAgICAgICBpZiAodmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uSW5wdXQoZTogQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gZWwudmFsdWU7XG4gICAgaWYgKCF0aGlzLl9tYXNrVmFsdWUpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoZWwudmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID1cbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSAxXG4gICAgICAgID8gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXG4gICAgICAgIDogKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgbGV0IGNhcmV0U2hpZnQgPSAwO1xuICAgIGxldCBiYWNrc3BhY2VTaGlmdCA9IGZhbHNlO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5VmFsdWVDaGFuZ2VzKHBvc2l0aW9uLCAoc2hpZnQ6IG51bWJlciwgX2JhY2tzcGFjZVNoaWZ0OiBib29sZWFuKSA9PiB7XG4gICAgICBjYXJldFNoaWZ0ID0gc2hpZnQ7XG4gICAgICBiYWNrc3BhY2VTaGlmdCA9IF9iYWNrc3BhY2VTaGlmdDtcbiAgICB9KTtcbiAgICAvLyBvbmx5IHNldCB0aGUgc2VsZWN0aW9uIGlmIHRoZSBlbGVtZW50IGlzIGFjdGl2ZVxuICAgIGlmICh0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fcG9zaXRpb24gPT09IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggPT09IDEgPyBudWxsIDogdGhpcy5fcG9zaXRpb247XG4gICAgbGV0IHBvc2l0aW9uVG9BcHBseTogbnVtYmVyID0gdGhpcy5fcG9zaXRpb25cbiAgICAgID8gdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggKyBwb3NpdGlvbiArIGNhcmV0U2hpZnRcbiAgICAgIDogcG9zaXRpb24gKyAodGhpcy5fY29kZSA9PT0gJ0JhY2tzcGFjZScgJiYgIWJhY2tzcGFjZVNoaWZ0ID8gMCA6IGNhcmV0U2hpZnQpO1xuICAgIGlmIChwb3NpdGlvblRvQXBwbHkgPiB0aGlzLl9nZXRBY3R1YWxJbnB1dExlbmd0aCgpKSB7XG4gICAgICBwb3NpdGlvblRvQXBwbHkgPSB0aGlzLl9nZXRBY3R1YWxJbnB1dExlbmd0aCgpO1xuICAgIH1cbiAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShwb3NpdGlvblRvQXBwbHksIHBvc2l0aW9uVG9BcHBseSk7XG4gICAgaWYgKCh0aGlzLm1hc2tFeHByZXNzaW9uLmluY2x1ZGVzKCdIJykgfHwgdGhpcy5tYXNrRXhwcmVzc2lvbi5pbmNsdWRlcygnTScpKSAmJiBjYXJldFNoaWZ0ID09PSAwKSB7XG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgMSk7XG4gICAgfVxuICAgIHRoaXMuX3Bvc2l0aW9uID0gbnVsbDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBwdWJsaWMgb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaEZuKCk7XG4gICAgdGhpcy5vblRvdWNoKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkZvY3VzKGU6IE1vdXNlRXZlbnQgfCBDdXN0b21LZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IHBvc1N0YXJ0ID0gMDtcbiAgICBjb25zdCBwb3NFbmQgPSAwO1xuICAgIGlmIChcbiAgICAgIGVsICE9PSBudWxsICYmXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCAhPT0gbnVsbCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPT09IGVsLnNlbGVjdGlvbkVuZCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPiB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIChlIGFzIGFueSkua2V5Q29kZSAhPT0gMzhcbiAgICApXG4gICAgICBpZiAodGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCkge1xuICAgICAgICAvLyBXZSBhcmUgc2hvd2luZyB0aGUgbWFzayBpbiB0aGUgaW5wdXRcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd24gPSB0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza0luSW5wdXQoKTtcbiAgICAgICAgaWYgKGVsLnNldFNlbGVjdGlvblJhbmdlICYmIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCArIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID09PSBlbC52YWx1ZSkge1xuICAgICAgICAgIC8vIHRoZSBpbnB1dCBPTkxZIGNvbnRhaW5zIHRoZSBtYXNrLCBzbyBwb3NpdGlvbiB0aGUgY3Vyc29yIGF0IHRoZSBzdGFydFxuICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UocG9zU3RhcnQsIHBvc0VuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGhlIGlucHV0IGNvbnRhaW5zIHNvbWUgY2hhcmFjdGVycyBhbHJlYWR5XG4gICAgICAgICAgaWYgKGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgdXNlciBjbGlja2VkIGJleW9uZCBvdXIgdmFsdWUncyBsZW5ndGgsIHBvc2l0aW9uIHRoZSBjdXJzb3IgYXQgdGhlIGVuZCBvZiBvdXIgdmFsdWVcbiAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCwgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBjb25zdCBuZXh0VmFsdWU6IHN0cmluZyB8IG51bGwgPVxuICAgICAgIWVsLnZhbHVlIHx8IGVsLnZhbHVlID09PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXhcbiAgICAgICAgPyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggKyB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93blxuICAgICAgICA6IGVsLnZhbHVlO1xuXG4gICAgLyoqIEZpeCBvZiBjdXJzb3IgcG9zaXRpb24ganVtcGluZyB0byBlbmQgaW4gbW9zdCBicm93c2VycyBubyBtYXR0ZXIgd2hlcmUgY3Vyc29yIGlzIGluc2VydGVkIG9uRm9jdXMgKi9cbiAgICBpZiAoZWwudmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgZWwudmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIGZpeCBvZiBjdXJzb3IgcG9zaXRpb24gd2l0aCBwcmVmaXggd2hlbiBtb3VzZSBjbGljayBvY2N1ciAqL1xuICAgIGlmICgoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgfHwgKGVsLnNlbGVjdGlvbkVuZCBhcyBudW1iZXIpKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoKSB7XG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGg7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqIHNlbGVjdCBvbmx5IGluc2VydGVkIHRleHQgKi9cbiAgICBpZiAoKGVsLnNlbGVjdGlvbkVuZCBhcyBudW1iZXIpID4gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSkge1xuICAgICAgZWwuc2VsZWN0aW9uRW5kID0gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKTtcbiAgICB9XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN5Y2xvbWF0aWMtY29tcGxleGl0eVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5RG93bihlOiBDdXN0b21LZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29kZSA9IGUuY29kZSA/IGUuY29kZSA6IGUua2V5O1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gZWwudmFsdWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDggJiYgZWwudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uRW5kO1xuICAgICAgfVxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOCAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAhPT0gMCkge1xuICAgICAgICAvLyBJZiBzcGVjaWFsQ2hhcnMgaXMgZmFsc2UsIChzaG91bGRuJ3QgZXZlciBoYXBwZW4pIHRoZW4gc2V0IHRvIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5zcGVjaWFsQ2hhcmFjdGVycyB8fCB0aGlzLl9jb25maWcuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgICAgIGlmICh0aGlzLnByZWZpeC5sZW5ndGggPiAxICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIDw9IHRoaXMucHJlZml4Lmxlbmd0aCkge1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMucHJlZml4Lmxlbmd0aCwgdGhpcy5wcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggIT09IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICE9PSAxKSB7XG4gICAgICAgICAgICB3aGlsZSAoXG4gICAgICAgICAgICAgIHRoaXMuc3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXModGhpcy5faW5wdXRWYWx1ZVsoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDFdLnRvU3RyaW5nKCkpICYmXG4gICAgICAgICAgICAgICgodGhpcy5wcmVmaXgubGVuZ3RoID49IDEgJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPiB0aGlzLnByZWZpeC5sZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmaXgubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdWZmaXhDaGVja09uUHJlc3NEZWxldGUoZS5rZXlDb2RlLCBlbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc3VmZml4Q2hlY2tPblByZXNzRGVsZXRlKGUua2V5Q29kZSwgZWwpO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXG4gICAgICAgIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIDw9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggJiZcbiAgICAgICAgKGVsLnNlbGVjdGlvbkVuZCBhcyBudW1iZXIpIDw9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJzb3JTdGFydDogbnVtYmVyIHwgbnVsbCA9IGVsLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgLy8gdGhpcy5vbkZvY3VzKGUpO1xuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDggJiZcbiAgICAgICAgIWVsLnJlYWRPbmx5ICYmXG4gICAgICAgIGN1cnNvclN0YXJ0ID09PSAwICYmXG4gICAgICAgIGVsLnNlbGVjdGlvbkVuZCA9PT0gZWwudmFsdWUubGVuZ3RoICYmXG4gICAgICAgIGVsLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCA6IDA7XG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayh0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uLCB0aGlzLl9wb3NpdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgICEhdGhpcy5zdWZmaXggJiZcbiAgICAgIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDEgJiZcbiAgICAgIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoIDwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcilcbiAgICApIHtcbiAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoLCB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChlLmtleUNvZGUgPT09IDY1ICYmIGUuY3RybEtleSA9PT0gdHJ1ZSkgfHwgLy8gQ3RybCsgQVxuICAgICAgKGUua2V5Q29kZSA9PT0gNjUgJiYgZS5tZXRhS2V5ID09PSB0cnVlKSAvLyBDbWQgKyBBIChNYWMpXG4gICAgKSB7XG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLl9nZXRBY3R1YWxJbnB1dExlbmd0aCgpKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VsU3RhcnQgPSBlbC5zZWxlY3Rpb25TdGFydDtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5zZWxFbmQgPSBlbC5zZWxlY3Rpb25FbmQ7XG4gIH1cblxuICAvKiogSXQgd3JpdGVzIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgKi9cbiAgcHVibGljIGFzeW5jIHdyaXRlVmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5wdXRWYWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGlucHV0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBpbnB1dFZhbHVlID0gU3RyaW5nKGlucHV0VmFsdWUpO1xuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuZGVjaW1hbE1hcmtlciAhPT0gJy4nID8gaW5wdXRWYWx1ZS5yZXBsYWNlKCcuJywgdGhpcy5kZWNpbWFsTWFya2VyKSA6IGlucHV0VmFsdWU7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5pc051bWJlclZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgKGlucHV0VmFsdWUgJiYgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24pIHx8XG4gICAgKHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uICYmICh0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggfHwgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCkpXG4gICAgICA/ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKGlucHV0VmFsdWUsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSxcbiAgICAgICAgXSlcbiAgICAgIDogKHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ3ZhbHVlJywgaW5wdXRWYWx1ZV0pO1xuICAgIHRoaXMuX2lucHV0VmFsdWUgPSBpbnB1dFZhbHVlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2U7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgcHVibGljIHN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShrZXlDb2RlOiBudW1iZXIsIGVsOiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKGtleUNvZGUgPT09IDQ2ICYmIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSkge1xuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoa2V5Q29kZSA9PT0gOCkge1xuICAgICAgaWYgKHRoaXMuc3VmZml4Lmxlbmd0aCA+IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSkge1xuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3VmZml4Lmxlbmd0aCA9PT0gMSAmJiB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCA9PT0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBJdCBkaXNhYmxlcyB0aGUgaW5wdXQgZWxlbWVudCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsnZGlzYWJsZWQnLCBpc0Rpc2FibGVkXTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueVxuICBwdWJsaWMgb25Nb2RlbENoYW5nZShlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIWUpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVwZWF0UGF0dGVyblN5bWJvbHMobWFza0V4cDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgKG1hc2tFeHAubWF0Y2goL3tbMC05XSt9LykgJiZcbiAgICAgICAgbWFza0V4cC5zcGxpdCgnJykucmVkdWNlKChhY2N1bTogc3RyaW5nLCBjdXJydmFsOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gY3VycnZhbCA9PT0gJ3snID8gaW5kZXggOiB0aGlzLl9zdGFydDtcblxuICAgICAgICAgIGlmIChjdXJydmFsICE9PSAnfScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXNrU2VydmljZS5fZmluZFNwZWNpYWxDaGFyKGN1cnJ2YWwpID8gYWNjdW0gKyBjdXJydmFsIDogYWNjdW07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2VuZCA9IGluZGV4O1xuICAgICAgICAgIGNvbnN0IHJlcGVhdE51bWJlcjogbnVtYmVyID0gTnVtYmVyKG1hc2tFeHAuc2xpY2UodGhpcy5fc3RhcnQgKyAxLCB0aGlzLl9lbmQpKTtcbiAgICAgICAgICBjb25zdCByZXBhY2VXaXRoOiBzdHJpbmcgPSBuZXcgQXJyYXkocmVwZWF0TnVtYmVyICsgMSkuam9pbihtYXNrRXhwW3RoaXMuX3N0YXJ0IC0gMV0pO1xuICAgICAgICAgIHJldHVybiBhY2N1bSArIHJlcGFjZVdpdGg7XG4gICAgICAgIH0sICcnKSkgfHxcbiAgICAgIG1hc2tFeHBcbiAgICApO1xuICB9XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHJpdmF0ZSBfYXBwbHlNYXNrKCk6IGFueSB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gPSB0aGlzLl9yZXBlYXRQYXR0ZXJuU3ltYm9scyh0aGlzLl9tYXNrVmFsdWUgfHwgJycpO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXG4gICAgICAndmFsdWUnLFxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKHRoaXMuX2lucHV0VmFsdWUsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGVUaW1lKHZhbHVlOiBzdHJpbmcpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3Qgcm93TWFza0xlbjogbnVtYmVyID0gdGhpcy5fbWFza1ZhbHVlLnNwbGl0KCcnKS5maWx0ZXIoKHM6IHN0cmluZykgPT4gcyAhPT0gJzonKS5sZW5ndGg7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7IC8vIERvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBmb3Igb3B0aW9uYWwgZm9ybSBjb250cm9sXG4gICAgfVxuXG4gICAgaWYgKCgrdmFsdWVbdmFsdWUubGVuZ3RoIC0gMV0gPT09IDAgJiYgdmFsdWUubGVuZ3RoIDwgcm93TWFza0xlbikgfHwgdmFsdWUubGVuZ3RoIDw9IHJvd01hc2tMZW4gLSAyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEFjdHVhbElucHV0TGVuZ3RoKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGggfHwgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVWYWxpZGF0aW9uRXJyb3IoYWN0dWFsVmFsdWU6IHN0cmluZyk6IFZhbGlkYXRpb25FcnJvcnMge1xuICAgIHJldHVybiB7XG4gICAgICBtYXNrOiB7XG4gICAgICAgIHJlcXVpcmVkTWFzazogdGhpcy5fbWFza1ZhbHVlLFxuICAgICAgICBhY3R1YWxWYWx1ZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIl19