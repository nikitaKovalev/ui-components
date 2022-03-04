import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageView {}
