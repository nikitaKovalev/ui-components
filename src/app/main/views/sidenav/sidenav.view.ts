import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './sidenav.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavView {
  links = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
}
