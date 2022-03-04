import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

type USER = {
  id: number,
  name: string,
};
const USERS: USER[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mark' },
  { id: 3, name: 'Tobey' },
  { id: 4, name: 'Spencer' },
];

@Component({
  templateUrl: './input.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputView {

  public readonly users: USER[] = USERS;
  public readonly userControl = new FormControl(null, Validators.required);

  public readonly displayUser = (user: { id: number, name: string }) => user.name;
  public readonly trackBy = (index: number) => index;

  constructor() {
    this.userControl?.valueChanges
      .subscribe(v => {
        console.log('valid: ', this.userControl?.valid, ' root');
      });

    this.userControl?.patchValue(this.users[0]);
  }

}
