import { Directive, forwardRef, InjectionToken } from '@angular/core';

export const UI_PREFIX = new InjectionToken<void>(
  'uiPrefix directive',
);

@Directive({
  selector: 'span[uiPrefix], ui-icon[uiPrefix]',
  providers: [
    {
      provide: UI_PREFIX,
      useExisting: forwardRef(() => UiPrefixDirective),
    },
  ],
})
export class UiPrefixDirective {}
