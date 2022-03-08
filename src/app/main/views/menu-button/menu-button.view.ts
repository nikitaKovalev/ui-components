import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './menu-button.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButtonView {

  public options: string[] = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10',
  ]

  public showClicked(option: string): void {
    console.log(option);
  }

}
