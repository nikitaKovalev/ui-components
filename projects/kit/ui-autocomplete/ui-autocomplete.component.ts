import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { identity, merge, Observable, of, Subject, switchMap } from 'rxjs';

import { UiOptionComponent } from '@ui-components/kit/ui-option';

type TODO_ANY = any;

@Component({
  selector: 'ui-autocomplete',
  exportAs: 'uiAutocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAutocompleteComponent
  implements OnChanges {

  @Input()
  public displayWith: (value: TODO_ANY) => string = identity;

  @ViewChild('root', { read: TemplateRef })
  public readonly templateRef: TemplateRef<any> | null = null;

  @ContentChildren(UiOptionComponent)
  public options: QueryList<UiOptionComponent> = new QueryList<UiOptionComponent>();

  public readonly displayWith$ = new Subject<void>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayWith'].firstChange) {
      this.displayWith$.next(changes['displayWith'].currentValue);
    }
  }

  public getOptionSelected$(): Observable<TODO_ANY> {
    return of(this.options.toArray())
      .pipe(
        switchMap((options: TODO_ANY) => {
          const click$ = options?.map((option: UiOptionComponent) => option.click$) || [];

          return merge(...click$);
        })
      );
  }

}
