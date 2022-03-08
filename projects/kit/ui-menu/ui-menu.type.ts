import { ConnectionPositionPair } from '@angular/cdk/overlay';

export type PositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ToggleType = 'menu' | 'more_vert' | 'more_horiz' | 'close';

export const TOP_LEFT: ConnectionPositionPair = {
  originX: 'start',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'bottom'
};

export const TOP_RIGHT: ConnectionPositionPair = {
  originX: 'end',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'bottom'
};

export const BOTTOM_LEFT: ConnectionPositionPair = {
  originX: 'start',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'top'
};

export const BOTTOM_RIGHT: ConnectionPositionPair = {
  originX: 'end',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'top'
};
