import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './table.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableView {

  public readonly elements: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon 10', weight: 20.10, symbol: 'Ne 10' },
    { position: 11, name: 'Neon 11', weight: 20.11, symbol: 'Ne 11' },
    { position: 12, name: 'Neon 12', weight: 20.12, symbol: 'Ne 12' },
    { position: 13, name: 'Neon 13', weight: 20.13, symbol: 'Ne 13' },
    { position: 14, name: 'Neon 14', weight: 20.14, symbol: 'Ne 14' },
    { position: 15, name: 'Neon 15', weight: 20.15, symbol: 'Ne 15' },
    { position: 16, name: 'Neon 16', weight: 20.16, symbol: 'Ne 16' },
    { position: 17, name: 'Neon 17', weight: 20.17, symbol: 'Ne 17' },
    { position: 18, name: 'Neon 18', weight: 20.18, symbol: 'Ne 18' },
    { position: 19, name: 'Neon 19', weight: 20.19, symbol: 'Ne 19' },
    { position: 20, name: 'Neon 20', weight: 20.20, symbol: 'Ne 20' },
    { position: 21, name: 'Neon 21', weight: 20.21, symbol: 'Ne 21' },
  ];

}
