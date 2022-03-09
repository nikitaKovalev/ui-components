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

import { identity, merge, Observable, startWith, Subject, switchMap } from 'rxjs';

import { TODO_ANY } from '@ui-components/core/types';
import { UiOptionComponent } from '@ui-components/kit/ui-option';

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
    return this.options.changes
      .pipe(
        startWith(this.options.toArray()),
        switchMap((options: UiOptionComponent[]) => {
          const click$ = options?.map((option: UiOptionComponent) => option.click$) || [];

          return merge(...click$);
        })
      );
  }

}
