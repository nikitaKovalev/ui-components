import { Directive, forwardRef, InjectionToken } from '@angular/core';

export const UI_SUFFIX = new InjectionToken<void>(
  'uiSuffix directive',
);

@Directive({
  selector: 'span[uiSuffix], ui-icon[uiSuffix]',
  providers: [
    {
      provide: UI_SUFFIX,
      useExisting: forwardRef(() => UiSuffixDirective),
    },
  ],
})
export class UiSuffixDirective {}
