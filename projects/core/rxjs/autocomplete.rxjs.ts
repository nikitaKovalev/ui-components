import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs/operators';

export function autocomplete<T>(
  filterCB?: (value: T | string) => boolean,
): MonoTypeOperatorFunction<string | T> {
  return pipe(
    startWith(''),
    debounceTime(250),
    distinctUntilChanged(),
    filter((value: T | string) => {
      if (filterCB) {
        return filterCB(value);
      }

      return typeof value === 'string' || typeof value === null;
    }),
  );
}
