import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, Observable } from 'rxjs';

export class UiDataSource<T> extends DataSource<T> {

  /** Stream of data that is provided to the table. */
  public get data(): T[] {
    return this._data$.value;
  }

  public set data(data: T[]) {
    this._data$.next(data);
  }

  private readonly _data$ = new BehaviorSubject<T[]>([]);

  constructor(data: T[] = []) {
    super();
    this._data$.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  public connect(): Observable<T[]> {
    return this._data$;
  }

  public disconnect(): void {
    this._data$.next([]);
  }

}