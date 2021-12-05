import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

import { fromEvent, mapTo, Observable } from 'rxjs';

type TODO_ANY = any;

@Component({
  selector: 'ui-option',
  templateUrl: './ui-option.component.html',
  styleUrls: ['./ui-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOptionComponent implements OnInit {

  @Input()
  public value: TODO_ANY = null;

  public click$: Observable<TODO_ANY> | null = null;

  constructor(
    private readonly _elRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    this.click$ = fromEvent(this._elRef.nativeElement, 'click')
      .pipe(mapTo(this.value));
  }

}
