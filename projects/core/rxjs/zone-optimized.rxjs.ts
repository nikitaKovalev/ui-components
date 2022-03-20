import { NgZone } from '@angular/core';

import { MonoTypeOperatorFunction, pipe } from 'rxjs';

import { zoneOut } from './zone-out.rxjs';
import { zoneIn } from './zone-in.rxjs';

export function zoneOptimized<T>(
  ngZone: NgZone
): MonoTypeOperatorFunction<T> {
  return pipe(zoneIn(ngZone), zoneOut(ngZone));
}