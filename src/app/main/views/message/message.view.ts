import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './message.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageView {}
