import { Directive, HostBinding, Input } from '@angular/core';

import { UiDataSource } from './ui-data-source.class';

type TrackBy = (index: number) => number;

@Directive()
export abstract class UiBaseTable<T> {
  @Input('dataSource')
  set initDataSource(data: T[]) {
    this.dataSource.data = data;
  }

  @HostBinding('class.ui-table')
  readonly class = true;

  readonly dataSource: UiDataSource<T> = new UiDataSource<T>([]);
  readonly trackBy: TrackBy = (index: number) => index;

  pageChanged(): void {}

  sortChanged(): void {}
}
