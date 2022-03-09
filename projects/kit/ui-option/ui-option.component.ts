import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { TODO_ANY } from '@ui-components/core/types';

@Component({
  selector: 'ui-option',
  templateUrl: './ui-option.component.html',
  styleUrls: ['./ui-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOptionComponent {

  @Input()
  public value: TODO_ANY = null;

  @HostListener('click')
  public onClick(): void {
    this._click$.next(this.value);
  }

  public get click$(): Observable<TODO_ANY> {
    return this._click$;
  }

  private readonly _click$ = new Subject<TODO_ANY>();

}
