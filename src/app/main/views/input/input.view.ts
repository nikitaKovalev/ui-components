import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './input.view.html',
  styleUrls: ['./input.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputView {

  public users = [
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'Mark',
    },
    {
      id: 3,
      name: 'Tobey',
    },
    {
      id: 4,
      name: 'Spencer',
    },
  ];

  public form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
  });

  public displayUser = (user: {id: number, name: string}): string => user.name;

  constructor() {
    this.form.get('username')
      ?.valueChanges
      .subscribe(v => {
        console.log(v);
        console.log('valid: ', this.form.get('username')?.valid, ' root');
      });
  }

}
