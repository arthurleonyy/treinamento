/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config } from './config';
import { MaskApplierService } from './mask-applier.service';
var MaskService = /** @class */ (function (_super) {
    tslib_1.__extends(MaskService, _super);
    function MaskService(document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.placeHolderCharacter = '_';
        _this.maskIsShown = '';
        _this.selStart = null;
        _this.selEnd = null;
        _this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = 
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        var _this = this;
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        if (!maskExpression) {
            return inputValue;
        }
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (this.maskExpression === 'IP' && this.showMaskTyped) {
            this.maskIsShown = this.showMaskInInput(inputValue || '#');
        }
        if (!inputValue && this.showMaskTyped) {
            this.formControlResult(this.prefix);
            return this.prefix + this.maskIsShown;
        }
        /** @type {?} */
        var getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        /** @type {?} */
        var newInputValue = '';
        if (this.hiddenInput !== undefined) {
            /** @type {?} */
            var actualResult = this.actualValue.split('');
            // tslint:disable no-unused-expression
            inputValue !== '' && actualResult.length
                ? typeof this.selStart === 'number' && typeof this.selEnd === 'number'
                    ? inputValue.length > actualResult.length
                        ? actualResult.splice(this.selStart, 0, getSymbol)
                        : inputValue.length < actualResult.length
                            ? actualResult.length - inputValue.length === 1
                                ? actualResult.splice(this.selStart - 1, 1)
                                : actualResult.splice(this.selStart, this.selEnd - this.selStart)
                            : null
                    : null
                : (actualResult = []);
            // tslint:enable no-unused-expression
            newInputValue = this.actualValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
        }
        newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
        /** @type {?} */
        var result = _super.prototype.applyMask.call(this, newInputValue, maskExpression, position, cb);
        this.actualValue = this.getActualValue(result);
        // handle some separator implications:
        // a.) adjust decimalMarker default (. -> ,) if thousandSeparator is a dot
        if (this.thousandSeparator === '.' && this.decimalMarker === '.') {
            this.decimalMarker = ',';
        }
        // b) remove decimal marker from list of special characters to mask
        if (this.maskExpression.startsWith('separator') && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item !== _this.decimalMarker; }));
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        /** @type {?} */
        var resLen = result.length;
        /** @type {?} */
        var prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    };
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    MaskService.prototype.hideInput = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    function (inputValue, maskExpression) {
        var _this = this;
        return inputValue
            .split('')
            .map((/**
         * @param {?} curr
         * @param {?} index
         * @return {?}
         */
        function (curr, index) {
            if (_this.maskAvailablePatterns &&
                _this.maskAvailablePatterns[maskExpression[index]] &&
                _this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return _this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        }))
            .join('');
    };
    // this function is not necessary, it checks result against maskExpression
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    MaskService.prototype.getActualValue = 
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        /** @type {?} */
        var compare = res
            .split('')
            .filter((/**
         * @param {?} symbol
         * @param {?} i
         * @return {?}
         */
        function (symbol, i) {
            return _this._checkSymbolMask(symbol, _this.maskExpression[i]) ||
                (_this.maskSpecialCharacters.includes(_this.maskExpression[i]) && symbol === _this.maskExpression[i]);
        }));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    };
    /**
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.shiftTypedSymbols = /**
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        var _this = this;
        /** @type {?} */
        var symbolToReplace = '';
        /** @type {?} */
        var newInputValue = (inputValue &&
            inputValue.split('').map((/**
             * @param {?} currSymbol
             * @param {?} index
             * @return {?}
             */
            function (currSymbol, index) {
                if (_this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== _this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    /** @type {?} */
                    var replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            }))) ||
            [];
        return newInputValue.join('');
    };
    /**
     * @param {?=} inputVal
     * @return {?}
     */
    MaskService.prototype.showMaskInInput = /**
     * @param {?=} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (this.showMaskTyped && !!this.shownMaskExpression) {
            if (this.maskExpression.length !== this.shownMaskExpression.length) {
                throw new Error('Mask expression must match mask placeholder length');
            }
            else {
                return this.shownMaskExpression;
            }
        }
        else if (this.showMaskTyped) {
            if (inputVal) {
                return this._checkForIp(inputVal);
            }
            return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
        }
        return '';
    };
    /**
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @return {?}
     */
    function () {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !==
                this._formElement.value.replace(/_/g, '').length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} mask
     * @return {?}
     */
    MaskService.prototype.checkSpecialCharAmount = /**
     * @param {?} mask
     * @return {?}
     */
    function (mask) {
        var _this = this;
        /** @type {?} */
        var chars = mask.split('').filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this._findSpecialChar(item); }));
        return chars.length;
    };
    /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    MaskService.prototype._checkForIp = /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (inputVal === '#') {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        /** @type {?} */
        var arr = [];
        for (var i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 3 && arr.length <= 6) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 6 && arr.length <= 9) {
            return this.placeHolderCharacter;
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    };
    /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.formControlResult = /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    };
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removePrefix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removeSuffix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorValue = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    };
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._regExpForRemove = /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return "\\" + item; })).join('|'), 'gi');
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._checkSymbols = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        if (result === '') {
            return result;
        }
        /** @type {?} */
        var separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
        /** @type {?} */
        var separatorValue = this._retrieveSeparatorValue(result);
        if (this.decimalMarker !== '.') {
            separatorValue = separatorValue.replace(this.decimalMarker, '.');
        }
        if (this.isNumberValue) {
            if (separatorPrecision) {
                if (result === this.decimalMarker) {
                    return null;
                }
                return this._checkPrecision(this.maskExpression, separatorValue);
            }
            else {
                return Number(separatorValue);
            }
        }
        else {
            return separatorValue;
        }
    };
    // TODO should think about helpers or separting decimal precision to own property
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorPrecision = 
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    function (maskExpretion) {
        /** @type {?} */
        var matcher = maskExpretion.match(new RegExp("^separator\\.([^d]*)"));
        return matcher ? Number(matcher[1]) : null;
    };
    /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    MaskService.prototype._checkPrecision = /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    function (separatorExpression, separatorValue) {
        if (separatorExpression.indexOf('2') > 0) {
            return Number(separatorValue).toFixed(2);
        }
        return Number(separatorValue);
    };
    MaskService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MaskService;
}(MaskApplierService));
export { MaskService };
if (false) {
    /** @type {?} */
    MaskService.prototype.maskExpression;
    /** @type {?} */
    MaskService.prototype.isNumberValue;
    /** @type {?} */
    MaskService.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskService.prototype.maskIsShown;
    /** @type {?} */
    MaskService.prototype.selStart;
    /** @type {?} */
    MaskService.prototype.selEnd;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._formElement;
    /** @type {?} */
    MaskService.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._config;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUNpQyx1Q0FBa0I7SUFXakQscUJBQzRCLFFBQWEsRUFDYixPQUFnQixFQUNsQyxXQUF1QixFQUN2QixTQUFvQjtRQUo5QixZQU1FLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBUDJCLGNBQVEsR0FBUixRQUFRLENBQUs7UUFDYixhQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2xDLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFkdkIsb0JBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsMEJBQW9CLEdBQVcsR0FBRyxDQUFDO1FBQ25DLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGNBQVEsR0FBa0IsSUFBSSxDQUFDO1FBQy9CLFlBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRzdCLGNBQVE7Ozs7UUFBRyxVQUFDLENBQU0sSUFBTSxDQUFDLEVBQUM7UUFTL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7SUFDckQsQ0FBQztJQUVELGlEQUFpRDs7Ozs7Ozs7O0lBQzFDLCtCQUFTOzs7Ozs7Ozs7SUFBaEIsVUFBaUIsVUFBa0IsRUFBRSxjQUFzQixFQUFFLFFBQW9CLEVBQUUsRUFB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdDLENBQUM7Ozs7Ozs7SUFFTyxxQ0FBZTs7Ozs7O0lBQXZCLFVBQXdCLG1CQUEyQixFQUFFLGNBQXNCO1FBQ3pFLElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoQyxDQUFDOztnQkFyUkYsVUFBVTs7OztnREFhTixNQUFNLFNBQUMsUUFBUTtnREFDZixNQUFNLFNBQUMsTUFBTTtnQkFwQlQsVUFBVTtnQkFBc0IsU0FBUzs7SUE0UmxELGtCQUFDO0NBQUEsQUF0UkQsQ0FDaUMsa0JBQWtCLEdBcVJsRDtTQXJSWSxXQUFXOzs7SUFDdEIscUNBQW1DOztJQUNuQyxvQ0FBc0M7O0lBQ3RDLDJDQUEwQzs7SUFDMUMsa0NBQWdDOztJQUNoQywrQkFBc0M7O0lBQ3RDLDZCQUFvQzs7Ozs7SUFDcEMsbUNBQXlDOztJQUV6QywrQkFBaUM7Ozs7O0lBRy9CLCtCQUF1Qzs7Ozs7SUFDdkMsOEJBQTBDOzs7OztJQUMxQyxrQ0FBK0I7Ozs7O0lBQy9CLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1hc2tBcHBsaWVyU2VydmljZSB9IGZyb20gJy4vbWFzay1hcHBsaWVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFza1NlcnZpY2UgZXh0ZW5kcyBNYXNrQXBwbGllclNlcnZpY2Uge1xuICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgaXNOdW1iZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGxhY2VIb2xkZXJDaGFyYWN0ZXI6IHN0cmluZyA9ICdfJztcbiAgcHVibGljIG1hc2tJc1Nob3duOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNlbFN0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIHNlbEVuZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfZm9ybUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWcsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKF9jb25maWcpO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmN5Y2xvbWF0aWMtY29tcGxleGl0eVxuICBwdWJsaWMgYXBwbHlNYXNrKGlucHV0VmFsdWU6IHN0cmluZywgbWFza0V4cHJlc3Npb246IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHt9KTogc3RyaW5nIHtcbiAgICBpZiAoIW1hc2tFeHByZXNzaW9uKSB7XG4gICAgICByZXR1cm4gaW5wdXRWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5tYXNrSXNTaG93biA9IHRoaXMuc2hvd01hc2tUeXBlZCA/IHRoaXMuc2hvd01hc2tJbklucHV0KCkgOiAnJztcbiAgICBpZiAodGhpcy5tYXNrRXhwcmVzc2lvbiA9PT0gJ0lQJyAmJiB0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHRoaXMubWFza0lzU2hvd24gPSB0aGlzLnNob3dNYXNrSW5JbnB1dChpbnB1dFZhbHVlIHx8ICcjJyk7XG4gICAgfVxuICAgIGlmICghaW5wdXRWYWx1ZSAmJiB0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2xSZXN1bHQodGhpcy5wcmVmaXgpO1xuICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcbiAgICB9XG4gICAgY29uc3QgZ2V0U3ltYm9sOiBzdHJpbmcgPSAhIWlucHV0VmFsdWUgJiYgdHlwZW9mIHRoaXMuc2VsU3RhcnQgPT09ICdudW1iZXInID8gaW5wdXRWYWx1ZVt0aGlzLnNlbFN0YXJ0XSA6ICcnO1xuICAgIGxldCBuZXdJbnB1dFZhbHVlID0gJyc7XG4gICAgaWYgKHRoaXMuaGlkZGVuSW5wdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGFjdHVhbFJlc3VsdDogc3RyaW5nW10gPSB0aGlzLmFjdHVhbFZhbHVlLnNwbGl0KCcnKTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICBpbnB1dFZhbHVlICE9PSAnJyAmJiBhY3R1YWxSZXN1bHQubGVuZ3RoXG4gICAgICAgID8gdHlwZW9mIHRoaXMuc2VsU3RhcnQgPT09ICdudW1iZXInICYmIHR5cGVvZiB0aGlzLnNlbEVuZCA9PT0gJ251bWJlcidcbiAgICAgICAgICA/IGlucHV0VmFsdWUubGVuZ3RoID4gYWN0dWFsUmVzdWx0Lmxlbmd0aFxuICAgICAgICAgICAgPyBhY3R1YWxSZXN1bHQuc3BsaWNlKHRoaXMuc2VsU3RhcnQsIDAsIGdldFN5bWJvbClcbiAgICAgICAgICAgIDogaW5wdXRWYWx1ZS5sZW5ndGggPCBhY3R1YWxSZXN1bHQubGVuZ3RoXG4gICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5sZW5ndGggLSBpbnB1dFZhbHVlLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5zcGxpY2UodGhpcy5zZWxTdGFydCAtIDEsIDEpXG4gICAgICAgICAgICAgIDogYWN0dWFsUmVzdWx0LnNwbGljZSh0aGlzLnNlbFN0YXJ0LCB0aGlzLnNlbEVuZCAtIHRoaXMuc2VsU3RhcnQpXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICA6IG51bGxcbiAgICAgICAgOiAoYWN0dWFsUmVzdWx0ID0gW10pO1xuICAgICAgLy8gdHNsaW50OmVuYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgbmV3SW5wdXRWYWx1ZSA9IHRoaXMuYWN0dWFsVmFsdWUubGVuZ3RoID8gdGhpcy5zaGlmdFR5cGVkU3ltYm9scyhhY3R1YWxSZXN1bHQuam9pbignJykpIDogaW5wdXRWYWx1ZTtcbiAgICB9XG4gICAgbmV3SW5wdXRWYWx1ZSA9IEJvb2xlYW4obmV3SW5wdXRWYWx1ZSkgJiYgbmV3SW5wdXRWYWx1ZS5sZW5ndGggPyBuZXdJbnB1dFZhbHVlIDogaW5wdXRWYWx1ZTtcbiAgICBjb25zdCByZXN1bHQ6IHN0cmluZyA9IHN1cGVyLmFwcGx5TWFzayhuZXdJbnB1dFZhbHVlLCBtYXNrRXhwcmVzc2lvbiwgcG9zaXRpb24sIGNiKTtcbiAgICB0aGlzLmFjdHVhbFZhbHVlID0gdGhpcy5nZXRBY3R1YWxWYWx1ZShyZXN1bHQpO1xuXG4gICAgLy8gaGFuZGxlIHNvbWUgc2VwYXJhdG9yIGltcGxpY2F0aW9uczpcbiAgICAvLyBhLikgYWRqdXN0IGRlY2ltYWxNYXJrZXIgZGVmYXVsdCAoLiAtPiAsKSBpZiB0aG91c2FuZFNlcGFyYXRvciBpcyBhIGRvdFxuICAgIGlmICh0aGlzLnRob3VzYW5kU2VwYXJhdG9yID09PSAnLicgJiYgdGhpcy5kZWNpbWFsTWFya2VyID09PSAnLicpIHtcbiAgICAgIHRoaXMuZGVjaW1hbE1hcmtlciA9ICcsJztcbiAgICB9XG5cbiAgICAvLyBiKSByZW1vdmUgZGVjaW1hbCBtYXJrZXIgZnJvbSBsaXN0IG9mIHNwZWNpYWwgY2hhcmFjdGVycyB0byBtYXNrXG4gICAgaWYgKHRoaXMubWFza0V4cHJlc3Npb24uc3RhcnRzV2l0aCgnc2VwYXJhdG9yJykgJiYgdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChpdGVtOiBzdHJpbmcpID0+IGl0ZW0gIT09IHRoaXMuZGVjaW1hbE1hcmtlcik7XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtQ29udHJvbFJlc3VsdChyZXN1bHQpO1xuXG4gICAgaWYgKCF0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIGlmICh0aGlzLmhpZGRlbklucHV0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA/IHRoaXMuaGlkZUlucHV0KHJlc3VsdCwgdGhpcy5tYXNrRXhwcmVzc2lvbikgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb25zdCByZXNMZW46IG51bWJlciA9IHJlc3VsdC5sZW5ndGg7XG4gICAgY29uc3QgcHJlZk5tYXNrOiBzdHJpbmcgPSB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XG4gICAgcmV0dXJuIHJlc3VsdCArICh0aGlzLm1hc2tFeHByZXNzaW9uID09PSAnSVAnID8gcHJlZk5tYXNrIDogcHJlZk5tYXNrLnNsaWNlKHJlc0xlbikpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5VmFsdWVDaGFuZ2VzKHBvc2l0aW9uOiBudW1iZXIgPSAwLCBjYjogRnVuY3Rpb24gPSAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlID0gdGhpcy5hcHBseU1hc2sodGhpcy5fZm9ybUVsZW1lbnQudmFsdWUsIHRoaXMubWFza0V4cHJlc3Npb24sIHBvc2l0aW9uLCBjYik7XG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xuICB9XG5cbiAgcHVibGljIGhpZGVJbnB1dChpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBpbnB1dFZhbHVlXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAubWFwKChjdXJyOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zICYmXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXSAmJlxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2luZGV4XV0uc3ltYm9sXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltpbmRleF1dLnN5bWJvbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycjtcbiAgICAgIH0pXG4gICAgICAuam9pbignJyk7XG4gIH1cblxuICAvLyB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBuZWNlc3NhcnksIGl0IGNoZWNrcyByZXN1bHQgYWdhaW5zdCBtYXNrRXhwcmVzc2lvblxuICBwdWJsaWMgZ2V0QWN0dWFsVmFsdWUocmVzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbXBhcmU6IHN0cmluZ1tdID0gcmVzXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAoc3ltYm9sOiBzdHJpbmcsIGk6IG51bWJlcikgPT5cbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soc3ltYm9sLCB0aGlzLm1hc2tFeHByZXNzaW9uW2ldKSB8fFxuICAgICAgICAgICh0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyh0aGlzLm1hc2tFeHByZXNzaW9uW2ldKSAmJiBzeW1ib2wgPT09IHRoaXMubWFza0V4cHJlc3Npb25baV0pXG4gICAgICApO1xuICAgIGlmIChjb21wYXJlLmpvaW4oJycpID09PSByZXMpIHtcbiAgICAgIHJldHVybiBjb21wYXJlLmpvaW4oJycpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIHNoaWZ0VHlwZWRTeW1ib2xzKGlucHV0VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHN5bWJvbFRvUmVwbGFjZSA9ICcnO1xuICAgIGNvbnN0IG5ld0lucHV0VmFsdWU6IHN0cmluZ1tdID1cbiAgICAgIChpbnB1dFZhbHVlICYmXG4gICAgICAgIGlucHV0VmFsdWUuc3BsaXQoJycpLm1hcCgoY3VyclN5bWJvbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXMoaW5wdXRWYWx1ZVtpbmRleCArIDFdKSAmJlxuICAgICAgICAgICAgaW5wdXRWYWx1ZVtpbmRleCArIDFdICE9PSB0aGlzLm1hc2tFeHByZXNzaW9uW2luZGV4ICsgMV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN5bWJvbFRvUmVwbGFjZSA9IGN1cnJTeW1ib2w7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZVtpbmRleCArIDFdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3ltYm9sVG9SZXBsYWNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcmVwbGFjZVN5bWJvbDogc3RyaW5nID0gc3ltYm9sVG9SZXBsYWNlO1xuICAgICAgICAgICAgc3ltYm9sVG9SZXBsYWNlID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZVN5bWJvbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnJTeW1ib2w7XG4gICAgICAgIH0pKSB8fFxuICAgICAgW107XG4gICAgcmV0dXJuIG5ld0lucHV0VmFsdWUuam9pbignJyk7XG4gIH1cblxuICBwdWJsaWMgc2hvd01hc2tJbklucHV0KGlucHV0VmFsPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zaG93TWFza1R5cGVkICYmICEhdGhpcy5zaG93bk1hc2tFeHByZXNzaW9uKSB7XG4gICAgICBpZiAodGhpcy5tYXNrRXhwcmVzc2lvbi5sZW5ndGggIT09IHRoaXMuc2hvd25NYXNrRXhwcmVzc2lvbi5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXNrIGV4cHJlc3Npb24gbXVzdCBtYXRjaCBtYXNrIHBsYWNlaG9sZGVyIGxlbmd0aCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd25NYXNrRXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd01hc2tUeXBlZCkge1xuICAgICAgaWYgKGlucHV0VmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja0ZvcklwKGlucHV0VmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm1hc2tFeHByZXNzaW9uLnJlcGxhY2UoL1xcdy9nLCB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHVibGljIGNsZWFySWZOb3RNYXRjaEZuKCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoICYmXG4gICAgICB0aGlzLnByZWZpeC5sZW5ndGggKyB0aGlzLm1hc2tFeHByZXNzaW9uLmxlbmd0aCArIHRoaXMuc3VmZml4Lmxlbmd0aCAhPT1cbiAgICAgICAgdGhpcy5fZm9ybUVsZW1lbnQudmFsdWUucmVwbGFjZSgvXy9nLCAnJykubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ3ZhbHVlJywgJyddO1xuICAgICAgdGhpcy5hcHBseU1hc2sodGhpcy5fZm9ybUVsZW1lbnQudmFsdWUsIHRoaXMubWFza0V4cHJlc3Npb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybUVsZW1lbnRQcm9wZXJ0eShbbmFtZSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmcgfCBib29sZWFuXSkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2Zvcm1FbGVtZW50LCBuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tTcGVjaWFsQ2hhckFtb3VudChtYXNrOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGNoYXJzOiBzdHJpbmdbXSA9IG1hc2suc3BsaXQoJycpLmZpbHRlcigoaXRlbTogc3RyaW5nKSA9PiB0aGlzLl9maW5kU3BlY2lhbENoYXIoaXRlbSkpO1xuICAgIHJldHVybiBjaGFycy5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja0ZvcklwKGlucHV0VmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChpbnB1dFZhbCA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn1gO1xuICAgIH1cbiAgICBjb25zdCBhcnI6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dFZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlucHV0VmFsW2ldLm1hdGNoKCdcXFxcZCcpKSB7XG4gICAgICAgIGFyci5wdXNoKGlucHV0VmFsW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFyci5sZW5ndGggPD0gMykge1xuICAgICAgcmV0dXJuIGAke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfWA7XG4gICAgfVxuICAgIGlmIChhcnIubGVuZ3RoID4gMyAmJiBhcnIubGVuZ3RoIDw9IDYpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKGFyci5sZW5ndGggPiA2ICYmIGFyci5sZW5ndGggPD0gOSkge1xuICAgICAgcmV0dXJuIHRoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXI7XG4gICAgfVxuICAgIGlmIChhcnIubGVuZ3RoID4gOSAmJiBhcnIubGVuZ3RoIDw9IDEyKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHByaXZhdGUgZm9ybUNvbnRyb2xSZXN1bHQoaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMpKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChpbnB1dFZhbHVlKSksIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycykge1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9jaGVja1N5bWJvbHMoaW5wdXRWYWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZVN1ZmZpeCh0aGlzLl9yZW1vdmVQcmVmaXgoaW5wdXRWYWx1ZSkpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVNYXNrKHZhbHVlOiBzdHJpbmcsIHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLl9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmUpLCAnJykgOiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVByZWZpeCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMucHJlZml4KSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UodGhpcy5wcmVmaXgsICcnKSA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlU3VmZml4KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5zdWZmaXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLnN1ZmZpeCwgJycpIDogdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9yZXRyaWV2ZVNlcGFyYXRvclZhbHVlKHJlc3VsdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZlTWFzayh0aGlzLl9yZW1vdmVTdWZmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyk7XG4gIH1cblxuICBwcml2YXRlIF9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmU6IHN0cmluZ1tdKTogUmVnRXhwIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZS5tYXAoKGl0ZW06IHN0cmluZykgPT4gYFxcXFwke2l0ZW19YCkuam9pbignfCcpLCAnZ2knKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrU3ltYm9scyhyZXN1bHQ6IHN0cmluZyk6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgIGlmIChyZXN1bHQgPT09ICcnKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHNlcGFyYXRvclByZWNpc2lvbjogbnVtYmVyIHwgbnVsbCA9IHRoaXMuX3JldHJpZXZlU2VwYXJhdG9yUHJlY2lzaW9uKHRoaXMubWFza0V4cHJlc3Npb24pO1xuICAgIGxldCBzZXBhcmF0b3JWYWx1ZTogc3RyaW5nID0gdGhpcy5fcmV0cmlldmVTZXBhcmF0b3JWYWx1ZShyZXN1bHQpO1xuICAgIGlmICh0aGlzLmRlY2ltYWxNYXJrZXIgIT09ICcuJykge1xuICAgICAgc2VwYXJhdG9yVmFsdWUgPSBzZXBhcmF0b3JWYWx1ZS5yZXBsYWNlKHRoaXMuZGVjaW1hbE1hcmtlciwgJy4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc051bWJlclZhbHVlKSB7XG4gICAgICBpZiAoc2VwYXJhdG9yUHJlY2lzaW9uKSB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRoaXMuZGVjaW1hbE1hcmtlcikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja1ByZWNpc2lvbih0aGlzLm1hc2tFeHByZXNzaW9uLCBzZXBhcmF0b3JWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHNlcGFyYXRvclZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvclZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gc2hvdWxkIHRoaW5rIGFib3V0IGhlbHBlcnMgb3Igc2VwYXJ0aW5nIGRlY2ltYWwgcHJlY2lzaW9uIHRvIG93biBwcm9wZXJ0eVxuICBwcml2YXRlIF9yZXRyaWV2ZVNlcGFyYXRvclByZWNpc2lvbihtYXNrRXhwcmV0aW9uOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBtYXRjaGVyOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IG1hc2tFeHByZXRpb24ubWF0Y2gobmV3IFJlZ0V4cChgXnNlcGFyYXRvclxcXFwuKFteZF0qKWApKTtcbiAgICByZXR1cm4gbWF0Y2hlciA/IE51bWJlcihtYXRjaGVyWzFdKSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja1ByZWNpc2lvbihzZXBhcmF0b3JFeHByZXNzaW9uOiBzdHJpbmcsIHNlcGFyYXRvclZhbHVlOiBzdHJpbmcpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgIGlmIChzZXBhcmF0b3JFeHByZXNzaW9uLmluZGV4T2YoJzInKSA+IDApIHtcbiAgICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpLnRvRml4ZWQoMik7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpO1xuICB9XG59XG4iXX0=