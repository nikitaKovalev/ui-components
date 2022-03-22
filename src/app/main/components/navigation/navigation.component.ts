import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Link { routerLink: string; title: string; }

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

  public readonly links: Link[] = [
    { routerLink: 'input', title: 'Input' },
    { routerLink: 'autocomplete', title: 'Autocomplete' },
    { routerLink: 'button', title: 'Button' },
    { routerLink: 'menu', title: 'Menu' },
    { routerLink: 'dialog', title: 'Dialog' },
    { routerLink: 'message', title: 'Message' },
    { routerLink: 'table', title: 'Table' },
    { routerLink: 'sidenav', title: 'Sidenav' },
    { routerLink: 'progress-bar', title: 'Progress bar' },
    { routerLink: 'const', title: 'Const' },
    { routerLink: 'tooltip', title: 'Tooltip' },
  ];

  public isOpened = true;

  public toggle(): void {
    this.isOpened = !this.isOpened;
  }

}
