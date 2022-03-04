import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { UI_ICONS, UIIcon } from './icons';
import { Palette } from './ui-icon.type';

const URL = 'http://www.w3.org/2000/svg';

@Component({
  selector: 'ui-icon',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './ui-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent {

  @Input()
  public color: Palette = 'primary';

  @Input()
  public set name(name: string) {
    if (this._icon) {
      this._elRef.nativeElement.removeChild(this._icon);
    }

    const content = this._getContent(name);
    this._icon = this._getSVG(content);
    this._renderer.setAttribute(this._icon, 'color', this.color);
    this._elRef.nativeElement.appendChild(this._icon);
  }

  private _icon: SVGElement | null = null;

  constructor(
    private readonly _elRef: ElementRef,
    private readonly _renderer: Renderer2,
    @Inject(DOCUMENT)
    private readonly _document: Document,
  ) {}

  private _getContent(name: string): string {
    return UI_ICONS.find((icon: UIIcon) => icon.name === name)?.data ?? '';
  }

  private _getSVG(content: string): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = content;

    return div.querySelector('svg') || this._document.createElementNS(URL, 'path');
  }

}