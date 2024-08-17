import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {CommonModule, DecimalPipe} from '@angular/common';
import {Mattress} from '../../../data/data';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    CommonModule,
    DecimalPipe,
    MatLabel,
    MatFormField,
    MatInput
  ]
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  columnDefs = [
    { columnDef: 'sku', header: 'Article', cell: (element: Mattress) => element.sku },
    { columnDef: 'name', header: 'Name', cell: (element: Mattress) => element.name },
    { columnDef: 'size', header: 'Size', cell: (element: Mattress) => element.size },
    { columnDef: 'status', header: 'Stat', cell: (element: Mattress) => element.status },
    { columnDef: 'price', header: 'Price', cell: (element: Mattress) => element.price },
    { columnDef: 'quantity', header: 'Quantity', cell: (element: Mattress) => element.quantity }
  ];
  dataSource: MatTableDataSource<Mattress> = new MatTableDataSource();
  sortedData: Mattress[] = [];
  search: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayedColumns = this.columnDefs.map(c => c.columnDef);
    this.dataService.data$.subscribe(mattresses => {
      this.dataSource.data = mattresses;
      this.sortedData = [...this.dataSource.data].filter(el=>el.quantity>0)
    });
    this.sortedData = [...this.dataSource.data].filter(el=>el.quantity>0)
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.sortedData = this.dataSource.filteredData;
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'sku':
          return this.compare(a.sku, b.sku, isAsc);
        case 'size':
          return this.compare(a.size[0], b.size[0], isAsc);
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
