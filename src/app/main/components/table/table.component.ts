import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiBaseTable } from '@ui-components/kit/ui-table';


@Component({
  selector: 'table-controller',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent
  extends UiBaseTable<any> {

  public readonly columns: string[] = [ 'position', 'name', 'weight', 'symbol' ];

}
