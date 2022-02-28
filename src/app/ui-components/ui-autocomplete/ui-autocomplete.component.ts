import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { identity } from 'rxjs';

import { TODO_ANY } from '../ui-input/ui-input.type';

@Component({
  selector: 'ui-autocomplete',
  exportAs: 'uiAutocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAutocompleteComponent {

  @Input()
  public displayWith: (value: TODO_ANY) => string = identity;

}
