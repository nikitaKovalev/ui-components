import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Inject,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';

import { filter, fromEvent, identity, merge, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';

import { TODO_ANY } from '@ui-components/core/types';
import { UiOptionComponent } from '@ui-components/kit/ui-option';
import { UiDestroyedService } from '@ui-components/core/services';

@Component({
  selector: 'ui-autocomplete',
  exportAs: 'uiAutocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss'],
  providers: [ UiDestroyedService ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAutocompleteComponent
  implements OnChanges, AfterContentInit {

  @Input()
  public displayWith: (value: TODO_ANY) => string = identity;

  @ViewChild('root', { read: TemplateRef })
  public readonly templateRef: TemplateRef<NgTemplateOutlet> | null = null;

  @ContentChildren(UiOptionComponent)
  public options: QueryList<Highlightable & UiOptionComponent>
    = new QueryList<Highlightable & UiOptionComponent>();

  public readonly displayWith$ = new Subject<void>();

  /** Keyboard accessibility **/
  private _keyManager: ActiveDescendantKeyManager<UiOptionComponent>
    = new ActiveDescendantKeyManager<UiOptionComponent>([]);

  constructor(
    @Inject(DOCUMENT)
    private readonly _document: Document,
    @Inject(UiDestroyedService)
    private readonly _destroyed$: UiDestroyedService,
  ) {
    this._subKeydown();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    /** Need to update displayWith value in the UiAutocompleteDirective **/
    if (changes['displayWith'].firstChange) {
      this.displayWith$.next(changes['displayWith'].currentValue);
    }
  }

  public ngAfterContentInit(): void {
    this._keyManager = new ActiveDescendantKeyManager<UiOptionComponent>(
      this.options,
    )
      .withWrap()
      .withTypeAhead();
  }

  /**
   * Select option via Click
   * */
  public getOptionSelected$(): Observable<TODO_ANY> {
    return this.options.changes
      .pipe(
        startWith(this.options.toArray()),
        switchMap((options: UiOptionComponent[]) => {
          const click$ = options?.map((option: UiOptionComponent) => option.click$) || [];

          return merge(...click$);
        })
      );
  }

  /**
   * If the arrow_up or arrow_down buttons were pressed then apply active class to option
   * if the enter button was pressed then emit OnClick() event of UiOptionComponent.
   **/
  private _subKeydown(): void {
    fromEvent<KeyboardEvent>(this._document, 'keydown')
      .pipe(
        filter(({ target }: KeyboardEvent) => {
          return target instanceof HTMLInputElement || target instanceof UiOptionComponent;
        }),
        filter(({ keyCode }: KeyboardEvent) => {
          return keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === ENTER;
        }),
        takeUntil(this._destroyed$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ENTER) {
          this._keyManager.activeItem?.onClick();
        } else {
          this._keyManager.onKeydown(event);
        }
      });
  }

}
