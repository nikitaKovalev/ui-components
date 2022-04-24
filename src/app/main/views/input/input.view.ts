import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './input.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputView {
  readonly userControl = new FormControl('Clean this!', Validators.required);
}
