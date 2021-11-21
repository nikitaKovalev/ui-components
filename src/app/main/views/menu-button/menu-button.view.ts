import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './menu-button.view.html',
  styleUrls: ['./menu-button.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuButtonView implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
