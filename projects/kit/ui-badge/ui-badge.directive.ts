import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Palette } from '@ui-components/core/types';

import { Badge, BadgePosition, BadgeSize } from './ui-badge.types';

let nextId = 0;

@Directive({
  selector: '[uiBadge]',
  host: {
    class: 'ui-badge',
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
export class UiBadgeDirective implements OnInit, OnDestroy {
  private _content: Badge;

  private _color: Palette = 'default';

  private _size: BadgeSize = 'medium';

  private _badgeElement: HTMLElement | undefined;

  private readonly _id: number = nextId++;

  private _isInitialized = false;
  @Input('uiBadgeHidden')
  hidden = false;

  @Input('uiBadgePosition')
  position: BadgePosition = 'above after';

  @Input('uiBadge')
  get content(): Badge {
    return this._content;
  }

  set content(newContent: Badge) {
    this._updateRenderedContent(newContent);
  }

  @Input('uiBadgeColor')
  get color(): Palette {
    return this._color;
  }

  set color(color: Palette) {
    this._color = color;
    this._setColor(color);
  }

  @Input('uiBadgeSize')
  get size(): BadgeSize {
    return this._size;
  }

  set size(size: BadgeSize) {
    this._size = size;
  }

  get isAbove(): boolean {
    return !this.position.includes('below');
  }

  get isAfter(): boolean {
    return !this.position.includes('before');
  }

  constructor(
    private readonly _elRef: ElementRef,
    private readonly _renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }

    this._isInitialized = true;
  }

  ngOnDestroy(): void {
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
    this._renderer.setAttribute(badgeElement, 'id', `ui-badge-content-${this._id}`);
    this._renderer.appendChild(this._elRef.nativeElement, badgeElement);

    return badgeElement;
  }

  private _updateRenderedContent(newContent: Badge): void {
    const newContentNormalized: string = `${newContent ?? ''}`.trim();

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
      classList.add(`ui-badge-${color}`);
    }
  }
}
