import { ChangeDetectionStrategy, Component } from '@angular/core';

let _id: number = 0;

@Component({
  selector: 'lt-error',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'lt-error',
    'attr.lt-error-id': `${ _id++ }`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LtErrorComponent {}