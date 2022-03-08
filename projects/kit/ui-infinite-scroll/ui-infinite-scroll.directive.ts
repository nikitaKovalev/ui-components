import { Directive, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { map, Subject, takeUntil } from 'rxjs';
import { filter, pairwise, tap, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[uiInfiniteScroll]'
})
export class UiInfiniteScrollDirective
  implements OnChanges, OnDestroy {

  /**
   * Default count of items displayed in dropdown.
   * @private
   */
  @Input('items')
  private _items = 1;

  /**
   * Default height of menu item in px.
   * @private
   */
  @Input('itemHeight')
  private _itemHeight = 68;

  /**
   * Default items of count for prevent additional loading.
   * @private
   */
  @Input('totalItems')
  private _totalItems = 0;

  @Output()
  public scrollEvent = new EventEmitter<number>();

  private readonly _elRefStyle = this._scroll.elementRef.nativeElement.style;
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _scroll: CdkVirtualScrollViewport,
  ) {
    this._runOutside();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._calculateViewHeight();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _runOutside(): void {
    this._ngZone.runOutsideAngular(() => {
      this._subScrollChanged();
    });
  }

  private _runInside(): void {
    this._ngZone.run(() => {
      const size = this._scroll.getDataLength() * 2;

      this.scrollEvent.emit(size);
    });
  }

  /**
   * We get the scroll offset in pixels from the bottom of the list.
   * For this we use a method provided by the virtual scroller called measureScrollOffset
   *
   * pairwise() operator to get this offset in pairs, so that we can see whether it is increasing or decreasing
   *
   * filter() stream and only allow it to continue when y2 < y1, i.e. the user is scrolling down and also when
   * the offset is near to the bottom (less than 140 pixels i.e. two items in our list)
   *
   * throttleTime() operator, so that we don’t get repeated scroll events and just one in 1000 ms
   * **/
  private _subScrollChanged(): void {
    this._scroll.elementScrolled()
      .pipe(
        map(() => this._scroll.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
        throttleTime(1000),
        tap(() => {
          if (this._items < this._totalItems) {
            this._runInside();
          }
        }),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  private _calculateViewHeight(): void {
    if (this._items > 3) {
      this._elRefStyle.height = '200px';
    } else {
      this._elRefStyle.height = `${this._items * this._itemHeight}px`;
    }
  }

}
