import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

/**
 * Usage example:
 *
 *  constructor(
 *    @Inject(LOCAL_STORAGE)
 *    private readonly _storage: Storage,
 *  ) {
 *    this._storage.getItem('someItem');
 *  }
 *
 * **/

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    providedIn: 'root',
    factory: () => {
      const { defaultView } = inject(DOCUMENT);

      if (!defaultView) {
        throw new Error('Window is not available');
      }

      return defaultView;
    },
  },
);

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);
