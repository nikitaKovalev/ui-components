import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { filter, merge, Observable, of, switchMap } from 'rxjs';

import { UiOptionComponent } from '../ui-option/ui-option.component';

type TODO_UNKNOWN = unknown;
type TODO_ANY = any;

@Component({
  selector: 'ui-autocomplete',
  exportAs: 'uiAutocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAutocompleteComponent {

  @Input()
  public displayWith = (value: TODO_ANY): string => value;

  @ViewChild('root', { read: TemplateRef })
  public readonly templateRef: TemplateRef<any> | null = null;

  @ContentChildren(UiOptionComponent)
  public options: QueryList<UiOptionComponent> | null = null;

  public optionSelected$(): Observable<TODO_UNKNOWN> {
    const options = this.options?.toArray() || [];

    return of(options)
      .pipe(
        filter(Boolean),
        switchMap((options: TODO_ANY) => {
          const click$ = options.map((option: UiOptionComponent) => option.click$);

          return merge(...click$);
        })
      );
  }

}
