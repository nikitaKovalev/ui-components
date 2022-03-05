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
    { routerLink: 'menu-button', title: 'Menu Button' },
    { routerLink: 'message', title: 'Message' },
    { routerLink: 'table', title: 'Table' },
  ];

}
