import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

import { Observable, Subject } from 'rxjs';

import { TODO_ANY } from '@ui-components/core/types';

@Component({
  selector: 'ui-option',
  templateUrl: './ui-option.component.html',
  styleUrls: ['./ui-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOptionComponent
  implements Highlightable {

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

  @ViewChild('option', { static: true })
  public option!: ElementRef<HTMLDivElement>;

  constructor(private readonly _cdRef: ChangeDetectorRef) {}

  public setActiveStyles(): void {
    this.option.nativeElement.scrollIntoView();
    this.active = true;
    this._cdRef.markForCheck();
  }
  public setInactiveStyles(): void {
    this.active = false;
    this._cdRef.markForCheck();
  }
  public active = false;

}
