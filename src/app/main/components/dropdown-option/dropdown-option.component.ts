import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ui-dropdown-option',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./dropdown-option.ts.scss'],
  host: {
    'class': 'ui-dropdown-option',
    '[class.--active]': 'active',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownOptionComponent
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

  constructor(
    @Inject(ChangeDetectorRef)
    private readonly _cdRef: ChangeDetectorRef,
  ) {}

  public setActiveStyles(): void {
    this.active = true;
    this._cdRef.markForCheck();
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  public getLabel(): string {
    return '';
  }
}