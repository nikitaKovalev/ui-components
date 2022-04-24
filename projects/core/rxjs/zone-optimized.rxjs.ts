import { NgZone } from '@angular/core';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';

import { zoneIn } from './zone-in.rxjs';
import { zoneOut } from './zone-out.rxjs';

export function zoneOptimized<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return pipe(zoneIn(ngZone), zoneOut(ngZone));
}
