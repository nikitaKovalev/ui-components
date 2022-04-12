import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './input.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputView {
  public readonly userControl = new FormControl(null, Validators.required);
}
