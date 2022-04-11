import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ui-option',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './ui-option.component.scss' ],
  host: {
    'class': 'ui-option',
    '[class.--active]': 'active',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOptionComponent
  implements Highlightable {

  @Input()
  public value: unknown = null;

  public active = false;

  public get click$(): Observable<unknown> {
    return this._click$.asObservable();
  }

  public onClick(): void {
    this._click$.next(this.value);
  }

  private readonly _click$ = new Subject<unknown>();

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  public getLabel(): string {
    return '';
  }

}
