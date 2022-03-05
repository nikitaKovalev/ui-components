import { Directive, HostBinding, Input } from '@angular/core';

import { UiDataSource } from './ui-data-source.class';

type TrackBy = (index: number) => number;

@Directive()
export abstract class UiBaseTable<T> {

  @Input('dataSource')
  public set initDataSource(data: T[]) {
    this.dataSource.data = data;
  }

  @HostBinding('class.ui-table')
  public readonly class = true;

  public readonly dataSource: UiDataSource<T> = new UiDataSource<T>([]);
  public readonly trackBy: TrackBy = (index: number) => index;

  public pageChanged(): void {}

  public sortChanged(): void {}

}
