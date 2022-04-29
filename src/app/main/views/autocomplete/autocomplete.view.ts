import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { autocomplete } from '@ui-components/core/rxjs';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';

type User = {
  id: number;
  name: string;
};
const USERS: User[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mark' },
  { id: 3, name: 'Tobey' },
  { id: 4, name: 'Spencer' },
];

@Component({
  templateUrl: './autocomplete.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteView {
  private readonly _users: User[] = USERS;

  readonly userControl = new FormControl(USERS[0]);
  readonly userRegularControl = new FormControl(USERS[1]);

  readonly users$: Observable<User[]> = this.userControl.valueChanges.pipe(
    autocomplete(),
    this._usersPipe(),
  );

  readonly regularUsers$: Observable<User[]> = this.userRegularControl.valueChanges.pipe(
    autocomplete(),
    this._usersPipe(),
  );

  readonly displayUser = (user: { id: number; name: string }): string => user?.name;
  readonly trackBy = (index: number): number => index;

  private _usersPipe(): UnaryFunction<Observable<string>, Observable<User[]>> {
    return pipe(
      map((value: string) => {
        return this._users.filter((user: User) => {
          return user.name.toLowerCase().startsWith(value?.toLowerCase() ?? '');
        });
      }),
    );
  }
}
