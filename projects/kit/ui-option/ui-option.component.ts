import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ui-option',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./ui-option.component.scss'],
  host: {
    class: 'ui-option',
    '[class.--active]': 'active',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOptionComponent implements Highlightable {
  private readonly _click$ = new Subject<unknown>();

  @Input()
  value: unknown = null;

  active = false;

  get click$(): Observable<unknown> {
    return this._click$.asObservable();
  }

  onClick(): void {
    this._click$.next(this.value);
  }

  setActiveStyles(): void {
    this.active = true;
  }

  setInactiveStyles(): void {
    this.active = false;
  }

  getLabel(): string {
    return '';
  }
}
