import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './input.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputView {
  public readonly userControl = new FormControl(null, Validators.required);
  constructor() {
    this.userControl.valueChanges
      .subscribe(v => {
        console.warn(`isValid: ${this.userControl.valid}`);
        console.log(`value: ${v}`);
      })

    this.userControl.setValue('asdada');
  }
}
