import { ChangeDetectionStrategy, Component } from '@angular/core';

let _id: number = 0;

@Component({
  selector: 'ui-error',
  template: `<ng-content></ng-content>`,
  styles: [`:host { color: var(--warn); }`],
  host: {
    'class': 'ui-error',
    'attr.ui-error-id': `${ _id++ }`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiErrorComponent {}