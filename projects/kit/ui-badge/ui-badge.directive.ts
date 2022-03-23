import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { Palette } from '@ui-components/core/types';

import { Badge, BadgePosition, BadgeSize } from './ui-badge.types';

let nextId = 0;

@Directive({
  selector: '[uiBadge]',
  host: {
    'class': 'ui-badge',
    '[class.ui-badge-above]': 'isAbove',
    '[class.ui-badge-below]': '!isAbove',
    '[class.ui-badge-after]': 'isAfter',
    '[class.ui-badge-before]': '!isAfter',
    '[class.ui-badge-small]': 'size === "small"',
    '[class.ui-badge-medium]': 'size === "medium"',
    '[class.ui-badge-large]': 'size === "large"',
    '[class.ui-badge-hidden]': 'hidden || !content',
  },
})
export class UiBadgeDirective
  implements OnInit, OnDestroy {

  @Input('uiBadge')
  public get content(): Badge {
    return this._content;
  }
  public set content(newContent: Badge) {
    this._updateRenderedContent(newContent);
  }
  private _content: Badge;

  @Input('uiBadgeColor')
  public get color(): Palette {
    return this._color;
  }
  public set color(color: Palette) {
    this._color = color;
    this._setColor(color);
  }
  private _color: Palette = 'default';

  @Input('uiBadgeSize')
  public get size(): BadgeSize {
    return this._size;
  }
  public set size(size: BadgeSize) {
    this._size = size;
  }
  private _size: BadgeSize = 'medium';

  @Input('uiBadgeHidden')
  public hidden = false;

  @Input('uiBadgePosition')
  public position: BadgePosition = 'above after';

  public get isAbove(): boolean {
    return this.position.indexOf('below') === -1;
  }

  public get isAfter(): boolean {
    return this.position.indexOf('before') === -1;
  }

  private _badgeElement: HTMLElement | undefined;
  private _id: number = nextId++;
  private _isInitialized = false;

  constructor(
    private readonly _elRef: ElementRef,
    private readonly _renderer: Renderer2,
  ) {}

  public ngOnInit(): void {
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }

    this._isInitialized = true;
  }

  public ngOnDestroy(): void {
    /**
     * ViewEngine only: when creating a badge through the Renderer, Angular remembers its index.
     * We have to destroy it ourselves, otherwise it'll be retained in memory.
     **/
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
    }
  }

  private _createBadgeElement(): HTMLElement {
    const badgeElement = this._renderer.createElement('span');
    const badgeClass = 'ui-badge-content';

    badgeElement.textContent = this.content;

    this._renderer.addClass(badgeElement, badgeClass);
    this._renderer.setAttribute(badgeElement, 'id', `ui-badge-content-${ this._id }`);
    this._renderer.appendChild(this._elRef.nativeElement, badgeElement)

    return badgeElement;
  }

  private _updateRenderedContent(newContent: Badge): void {
    const newContentNormalized: string = `${ newContent ?? '' }`.trim();

    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }

    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }

    this._content = newContentNormalized;
    this._setColor(this.color);
  }

  private _setColor(color: Palette): void {
    const classList = this._elRef.nativeElement.classList;
    if (color) {
      classList.add(`ui-badge-${ color }`);
    }
  }

}
