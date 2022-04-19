import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { map, Observable, pipe, UnaryFunction } from 'rxjs';

import { autocomplete } from '@ui-components/core/rxjs';

type User = {
  id: number,
  name: string,
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

  public readonly userControl = new FormControl(USERS[0]);
  public readonly userRegularControl = new FormControl(USERS[1]);

  public readonly displayUser = (user: { id: number, name: string }) => user?.name;
  public readonly trackBy = (index: number) => index;

  public readonly users$: Observable<User[]> = this.userControl.valueChanges.pipe(
    autocomplete(),
    this._usersPipe(),
  );

  public readonly regularUsers$: Observable<User[]> = this.userRegularControl.valueChanges.pipe(
    autocomplete(),
    this._usersPipe(),
  )

  private readonly _users: User[] = USERS;

  private _usersPipe(): UnaryFunction<Observable<string>, Observable<User[]>> {
    return pipe(
      map((value: string) => {
        return this._users.filter((user: User) => {
          return user.name.toLowerCase().startsWith(value?.toLowerCase() ?? '');
        });
      })
    );
  }

}
