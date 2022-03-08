import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Palette } from '@ui-components/core/types';

import { Icon } from './ui-message.type';

/**
 * This component replaces <td-message></td-message> from CovalentMessageModule
 * It could be used to display messages
 * Example of usage:
 * <ui-message
    color="primary"
    icon="info"
    [label]="Label"
    [subLabel]="Sub Label">
  </ui-message>
 * **/
@Component({
  selector: 'ui-message',
  templateUrl: './ui-message.component.html',
  styleUrls: ['./ui-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMessageComponent {

  @Input()
  public color: Palette = 'primary';

  @Input()
  public icon: Icon = 'info_o';

  @Input()
  public label = '';

  @Input()
  public subLabel = '';

  @Output()
  public triggerEvent = new EventEmitter<void>();

}
