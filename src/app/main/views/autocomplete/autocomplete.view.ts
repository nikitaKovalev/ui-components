import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { autocomplete, watch } from '@ui-components/core/rxjs';

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
  selector: 'autocomplete-view',
  templateUrl: './autocomplete.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteView
  implements OnDestroy {

  public readonly userControl = new FormControl(null);
  public readonly userRegularControl = new FormControl(null);

  public readonly displayUser = (user: { id: number, name: string }) => user.name;
  public readonly trackBy = (index: number) => index;

  public users: User[] = USERS;
  private readonly _users: User[] = USERS;

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _cdRef: ChangeDetectorRef,
  ) {
    this._subControlChanged(this.userControl);
    this._subControlChanged(this.userRegularControl);

    this.userControl?.patchValue(this.users[0]);
    this.userRegularControl?.patchValue(this.users[1]);
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _subControlChanged(control: FormControl): void {
    control.valueChanges
      .pipe(
        autocomplete(),
        watch(this._cdRef),
        takeUntil(this._destroyed$)
      )
      .subscribe((value: string) => {
        this.users = this._users.filter((user: User) => {
          return user.name.toLowerCase().startsWith(value?.toLowerCase() ?? '');
        });
      });
  }

}
