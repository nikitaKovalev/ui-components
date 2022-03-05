import { InjectionToken } from '@angular/core';
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
export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);