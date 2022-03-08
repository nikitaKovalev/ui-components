import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';

import { fromEvent, merge, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UiOptionComponent } from '@ui-components/kit/ui-option';

import { BOTTOM_LEFT, BOTTOM_RIGHT, PositionType, ToggleType, TOP_LEFT, TOP_RIGHT } from './ui-menu.type';
import { fadeIn, fadeOut } from './fade.animation';
import { toggle } from './ui-menu.animation';

export type Palette = 'primary' | 'accent' | 'warn' | 'error';

@Component({
  selector: 'ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss'],
  animations: [ toggle, fadeIn, fadeOut ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMenuComponent
  implements AfterViewInit, OnDestroy {

  @HostBinding('attr.type')
  @Input()
  public type: ToggleType = 'more_vert';

  @HostBinding('attr.color')
  @Input()
  public color: Palette = 'primary';

  @Input('position')
  public set overlayPosition(position: PositionType) {
    this.position = this._getPosition(position);
  }

  @HostBinding('class.menu-button')
  public readonly class = true;

  @ViewChild(TemplatePortalDirective)
  public contentTemplate: TemplatePortalDirective | null = null;

  @ContentChildren(UiOptionComponent)
  public readonly options: QueryList<UiOptionComponent> = new QueryList<UiOptionComponent>();

  public position: ConnectionPositionPair[] = [BOTTOM_LEFT, TOP_LEFT];

  public trigger = '';

  private _overlayRef: OverlayRef = this._overlay.create();

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _elRef: ElementRef,
    private readonly _overlay: Overlay,
    private readonly _cdRef: ChangeDetectorRef,
  ){}

  public ngAfterViewInit(): void {
    this._subContainerClicked();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  protected _subContainerClicked(): void {
    fromEvent(this._elRef.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.trigger = this.type;

          this._overlayRef = this._overlay.create(this._overlayConfig);
          this._overlayRef.attach(this.contentTemplate);
          this._cdRef.markForCheck();
        }),
        switchMap(() => this._getCloseEmitters$()),
        takeUntil(this._destroyed$),
      )
      .subscribe(() => {
        this.trigger = 'close';

        this._overlayRef.detach();
        this._cdRef.markForCheck();
      });
  }

  private _getCloseEmitters$(): Observable<unknown | MouseEvent> {
    const clicked$ = of(this.options.toArray())
      .pipe(
        switchMap((options: UiOptionComponent[]) => {
          const click$ = options?.map((option: UiOptionComponent) => option.click$) || [];

          return merge(...click$);
        })
      );

    return merge(clicked$, this._overlayRef.backdropClick());
  }

  protected get _overlayConfig(): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elRef)
      .withPush(false)
      .withPositions(this.position);

    const overlayConfig: OverlayConfig = {
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._overlay.scrollStrategies.block(),
    };

    return new OverlayConfig(overlayConfig);
  }

  private _getPosition(position: PositionType): ConnectionPositionPair[] {
    switch (position) {
      case 'bottom-left':
        return [BOTTOM_LEFT, TOP_LEFT];
      case 'bottom-right':
        return [BOTTOM_RIGHT, TOP_RIGHT];
      case 'top-left':
        return [TOP_LEFT, BOTTOM_LEFT];
      case 'top-right':
        return [TOP_RIGHT, BOTTOM_RIGHT];
    }
  }

}
