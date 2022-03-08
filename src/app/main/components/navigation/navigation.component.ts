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
    { routerLink: 'menu', title: 'Menu' },
    { routerLink: 'dialog', title: 'Dialog' },
    { routerLink: 'message', title: 'Message' },
    { routerLink: 'table', title: 'Table' },
  ];

}
