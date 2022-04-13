import { InjectionToken } from '@angular/core';
import { OverlayConfig } from '@angular/cdk/overlay';

export const OVERLAY_CONFIG = new InjectionToken<OverlayConfig>(
  'overlay configuration',
);
