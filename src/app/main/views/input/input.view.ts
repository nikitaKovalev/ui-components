import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './input.view.html',
  styleUrls: ['./input.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputView {

  public form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
  });

  constructor() {
    this.form.get('username')
      ?.valueChanges
      .subscribe(v => {
        console.log('valid: ', this.form.get('username')?.valid, ' root');
      });
  }

}
