import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {}
