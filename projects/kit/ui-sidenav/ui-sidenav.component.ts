import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

const MAX_WIDTH = '16.25rem';
const MIN_WIDTH = '5rem';

@Component({
  selector: 'ui-sidenav',
  templateUrl: './ui-sidenav.component.html',
  styleUrls: ['./ui-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSidenavComponent {
  private _width: string = MAX_WIDTH;

  @Input('opened')
  set panelOpenedState(isOpened: boolean) {
    this._renderer.setStyle(
      this._elRef.nativeElement,
      'width',
      isOpened ? this._width : MIN_WIDTH,
    );
  }

  @Input()
  @HostBinding('attr.position')
  position: 'start' | 'end' = 'start';

  @Input()
  set width(width: string) {
    this._width = width;
    this._renderer.setStyle(this._elRef.nativeElement, 'width', width);
  }

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elRef: ElementRef,
  ) {}
}
