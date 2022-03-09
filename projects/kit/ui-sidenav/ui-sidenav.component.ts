import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

const MAX_WIDTH = '16.25rem';
const MIN_WIDTH = '5rem';

@Component({
  selector: 'ui-sidenav',
  templateUrl: './ui-sidenav.component.html',
  styleUrls: ['./ui-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSidenavComponent {

  @Input('opened')
  public set panelOpenedState(isOpened: boolean) {
    this._renderer.setStyle(
      this._elRef.nativeElement,
      'width',
      isOpened ? this._width : MIN_WIDTH,
    );
  }

  @Input()
  @HostBinding('attr.position')
  public position: 'start' | 'end' = 'start';

  @Input()
  public set width(width: string) {
    this._width = width;
    this._renderer.setStyle(this._elRef.nativeElement,'width', width);
  }

  private _width: string = MAX_WIDTH;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elRef: ElementRef,
  ) {}

}
