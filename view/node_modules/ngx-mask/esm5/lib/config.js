/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * @record
 */
export function IConfig() { }
if (false) {
    /** @type {?} */
    IConfig.prototype.suffix;
    /** @type {?} */
    IConfig.prototype.prefix;
    /** @type {?} */
    IConfig.prototype.thousandSeparator;
    /** @type {?} */
    IConfig.prototype.decimalMarker;
    /** @type {?} */
    IConfig.prototype.clearIfNotMatch;
    /** @type {?} */
    IConfig.prototype.showTemplate;
    /** @type {?} */
    IConfig.prototype.showMaskTyped;
    /** @type {?} */
    IConfig.prototype.placeHolderCharacter;
    /** @type {?} */
    IConfig.prototype.shownMaskExpression;
    /** @type {?} */
    IConfig.prototype.dropSpecialCharacters;
    /** @type {?} */
    IConfig.prototype.specialCharacters;
    /** @type {?} */
    IConfig.prototype.hiddenInput;
    /** @type {?} */
    IConfig.prototype.validation;
    /** @type {?} */
    IConfig.prototype.separatorLimit;
    /** @type {?} */
    IConfig.prototype.allowNegativeNumbers;
    /** @type {?} */
    IConfig.prototype.patterns;
}
/** @type {?} */
export var config = new InjectionToken('config');
/** @type {?} */
export var NEW_CONFIG = new InjectionToken('NEW_CONFIG');
/** @type {?} */
export var INITIAL_CONFIG = new InjectionToken('INITIAL_CONFIG');
/** @type {?} */
export var initialConfig = {
    suffix: '',
    prefix: '',
    thousandSeparator: ' ',
    decimalMarker: '.',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    placeHolderCharacter: '_',
    dropSpecialCharacters: true,
    hiddenInput: undefined,
    shownMaskExpression: '',
    separatorLimit: '',
    allowNegativeNumbers: false,
    validation: true,
    // tslint:disable-next-line: quotemark
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true,
        },
        X: {
            pattern: new RegExp('\\d'),
            symbol: '*',
        },
        A: {
            pattern: new RegExp('[a-zA-Z0-9]'),
        },
        S: {
            pattern: new RegExp('[a-zA-Z]'),
        },
        d: {
            pattern: new RegExp('\\d'),
        },
        m: {
            pattern: new RegExp('\\d'),
        },
        M: {
            pattern: new RegExp('\\d'),
        },
        H: {
            pattern: new RegExp('\\d'),
        },
        h: {
            pattern: new RegExp('\\d'),
        },
        s: {
            pattern: new RegExp('\\d'),
        },
    },
};
/** @type {?} */
export var timeMasks = ['Hh:m0:s0', 'Hh:m0', 'm0:s0'];
/** @type {?} */
export var withoutValidation = [
    'percent',
    'Hh',
    's0',
    'm0',
    'separator',
    'd0/M0/0000',
    'd0/M0',
    'd0',
    'M0',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9DLDZCQXVCQzs7O0lBdEJDLHlCQUFlOztJQUNmLHlCQUFlOztJQUNmLG9DQUEwQjs7SUFDMUIsZ0NBQXlCOztJQUN6QixrQ0FBeUI7O0lBQ3pCLCtCQUFzQjs7SUFDdEIsZ0NBQXVCOztJQUN2Qix1Q0FBNkI7O0lBQzdCLHNDQUE0Qjs7SUFDNUIsd0NBQTBDOztJQUMxQyxvQ0FBNEI7O0lBQzVCLDhCQUFpQzs7SUFDakMsNkJBQW9COztJQUNwQixpQ0FBdUI7O0lBQ3ZCLHVDQUE4Qjs7SUFDOUIsMkJBTUU7OztBQUlKLE1BQU0sS0FBTyxNQUFNLEdBQTRCLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQzs7QUFDM0UsTUFBTSxLQUFPLFVBQVUsR0FBNEIsSUFBSSxjQUFjLENBQUMsWUFBWSxDQUFDOztBQUNuRixNQUFNLEtBQU8sY0FBYyxHQUE0QixJQUFJLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFM0YsTUFBTSxLQUFPLGFBQWEsR0FBWTtJQUNwQyxNQUFNLEVBQUUsRUFBRTtJQUNWLE1BQU0sRUFBRSxFQUFFO0lBQ1YsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixhQUFhLEVBQUUsR0FBRztJQUNsQixlQUFlLEVBQUUsS0FBSztJQUN0QixZQUFZLEVBQUUsS0FBSztJQUNuQixhQUFhLEVBQUUsS0FBSztJQUNwQixvQkFBb0IsRUFBRSxHQUFHO0lBQ3pCLHFCQUFxQixFQUFFLElBQUk7SUFDM0IsV0FBVyxFQUFFLFNBQVM7SUFDdEIsbUJBQW1CLEVBQUUsRUFBRTtJQUN2QixjQUFjLEVBQUUsRUFBRTtJQUNsQixvQkFBb0IsRUFBRSxLQUFLO0lBQzNCLFVBQVUsRUFBRSxJQUFJOztJQUVoQixpQkFBaUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDekYsUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFO1lBQ0gsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUIsTUFBTSxFQUFFLEdBQUc7U0FDWjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDbkM7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ2hDO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO0tBQ0Y7Q0FDRjs7QUFFRCxNQUFNLEtBQU8sU0FBUyxHQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7O0FBRWpFLE1BQU0sS0FBTyxpQkFBaUIsR0FBYTtJQUN6QyxTQUFTO0lBQ1QsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osV0FBVztJQUNYLFlBQVk7SUFDWixPQUFPO0lBQ1AsSUFBSTtJQUNKLElBQUk7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gIHN1ZmZpeDogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgdGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZztcbiAgZGVjaW1hbE1hcmtlcjogJy4nIHwgJywnO1xuICBjbGVhcklmTm90TWF0Y2g6IGJvb2xlYW47XG4gIHNob3dUZW1wbGF0ZTogYm9vbGVhbjtcbiAgc2hvd01hc2tUeXBlZDogYm9vbGVhbjtcbiAgcGxhY2VIb2xkZXJDaGFyYWN0ZXI6IHN0cmluZztcbiAgc2hvd25NYXNrRXhwcmVzc2lvbjogc3RyaW5nO1xuICBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IGJvb2xlYW4gfCBzdHJpbmdbXTtcbiAgc3BlY2lhbENoYXJhY3RlcnM6IHN0cmluZ1tdO1xuICBoaWRkZW5JbnB1dDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgdmFsaWRhdGlvbjogYm9vbGVhbjtcbiAgc2VwYXJhdG9yTGltaXQ6IHN0cmluZztcbiAgYWxsb3dOZWdhdGl2ZU51bWJlcnM6IGJvb2xlYW47XG4gIHBhdHRlcm5zOiB7XG4gICAgW2NoYXJhY3Rlcjogc3RyaW5nXToge1xuICAgICAgcGF0dGVybjogUmVnRXhwO1xuICAgICAgb3B0aW9uYWw/OiBib29sZWFuO1xuICAgICAgc3ltYm9sPzogc3RyaW5nO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIG9wdGlvbnNDb25maWcgPSBQYXJ0aWFsPElDb25maWc+O1xuZXhwb3J0IGNvbnN0IGNvbmZpZzogSW5qZWN0aW9uVG9rZW48SUNvbmZpZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2NvbmZpZycpO1xuZXhwb3J0IGNvbnN0IE5FV19DT05GSUc6IEluamVjdGlvblRva2VuPElDb25maWc+ID0gbmV3IEluamVjdGlvblRva2VuKCdORVdfQ09ORklHJyk7XG5leHBvcnQgY29uc3QgSU5JVElBTF9DT05GSUc6IEluamVjdGlvblRva2VuPElDb25maWc+ID0gbmV3IEluamVjdGlvblRva2VuKCdJTklUSUFMX0NPTkZJRycpO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbENvbmZpZzogSUNvbmZpZyA9IHtcbiAgc3VmZml4OiAnJyxcbiAgcHJlZml4OiAnJyxcbiAgdGhvdXNhbmRTZXBhcmF0b3I6ICcgJyxcbiAgZGVjaW1hbE1hcmtlcjogJy4nLFxuICBjbGVhcklmTm90TWF0Y2g6IGZhbHNlLFxuICBzaG93VGVtcGxhdGU6IGZhbHNlLFxuICBzaG93TWFza1R5cGVkOiBmYWxzZSxcbiAgcGxhY2VIb2xkZXJDaGFyYWN0ZXI6ICdfJyxcbiAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiB0cnVlLFxuICBoaWRkZW5JbnB1dDogdW5kZWZpbmVkLFxuICBzaG93bk1hc2tFeHByZXNzaW9uOiAnJyxcbiAgc2VwYXJhdG9yTGltaXQ6ICcnLFxuICBhbGxvd05lZ2F0aXZlTnVtYmVyczogZmFsc2UsXG4gIHZhbGlkYXRpb246IHRydWUsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcXVvdGVtYXJrXG4gIHNwZWNpYWxDaGFyYWN0ZXJzOiBbJy0nLCAnLycsICcoJywgJyknLCAnLicsICc6JywgJyAnLCAnKycsICcsJywgJ0AnLCAnWycsICddJywgJ1wiJywgXCInXCJdLFxuICBwYXR0ZXJuczoge1xuICAgICcwJzoge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICB9LFxuICAgICc5Jzoge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0sXG4gICAgWDoge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICAgIHN5bWJvbDogJyonLFxuICAgIH0sXG4gICAgQToge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnW2EtekEtWjAtOV0nKSxcbiAgICB9LFxuICAgIFM6IHtcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1thLXpBLVpdJyksXG4gICAgfSxcbiAgICBkOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgIH0sXG4gICAgbToge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICB9LFxuICAgIE06IHtcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgfSxcbiAgICBIOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgIH0sXG4gICAgaDoge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICB9LFxuICAgIHM6IHtcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCB0aW1lTWFza3M6IHN0cmluZ1tdID0gWydIaDptMDpzMCcsICdIaDptMCcsICdtMDpzMCddO1xuXG5leHBvcnQgY29uc3Qgd2l0aG91dFZhbGlkYXRpb246IHN0cmluZ1tdID0gW1xuICAncGVyY2VudCcsXG4gICdIaCcsXG4gICdzMCcsXG4gICdtMCcsXG4gICdzZXBhcmF0b3InLFxuICAnZDAvTTAvMDAwMCcsXG4gICdkMC9NMCcsXG4gICdkMCcsXG4gICdNMCcsXG5dO1xuIl19