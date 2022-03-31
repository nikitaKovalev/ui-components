import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: 'lt-input.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LtInputView {
  public usernameControl = new FormControl(null, Validators.required);

  constructor() {
    this.usernameControl.valueChanges
      .pipe()
      .subscribe((value: any) => console.log(
        value,
        `valid: ${this.usernameControl.valid}`
      ));
  }

}