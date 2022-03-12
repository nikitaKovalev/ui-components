import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Palette } from '@ui-components/core/types';

import { UiIconService } from './ui-icon.service';

const URL = 'http://www.w3.org/2000/svg';

@Component({
  selector: 'ui-icon',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './ui-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent
  implements AfterContentInit {

  @Input()
  public color: Palette = 'primary';

  private _icon: SVGElement | null = null;

  constructor(
    private readonly _elRef: ElementRef,
    private readonly _renderer: Renderer2,
    @Inject(DOCUMENT)
    private readonly _document: Document,
    private readonly _uiIconSvc: UiIconService,
  ) {}

  public ngAfterContentInit(): void {
    this._initIcon();
  }

  private _initIcon(): void {
    if (this._icon) {
      this._elRef.nativeElement.removeChild(this._icon);
    }

    const content = this._uiIconSvc.getIcon(this._elRef.nativeElement.innerText);
    this._icon = this._getSVG(content);
    // remove text from the element
    this._elRef.nativeElement.innerText = '';

    this._elRef.nativeElement.appendChild(this._icon);
    this._renderer.setAttribute(this._icon, 'color', this.color);
  }

  private _getSVG(content: string): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = content;

    return div.querySelector('svg') || this._document.createElementNS(URL, 'path');
  }

}
