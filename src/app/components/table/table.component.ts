import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DecimalPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";


export interface PeriodicElement {
  name: string;
  article: number;
  size: number[];
  count: number;
  prise: number;
  status: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {article: 1535467, name: 'S20 Plus', size: [90, 200], count: 1, prise: 10000, status: 11},
  {article: 2535467, name: 'S20 Gold', size: [80, 200], count: 2, prise: 10000, status: 11},
  {article: 3535467, name: 'S25 Gold', size: [180, 200], count: 5, prise: 10000, status: 11},
  {article: 4535467, name: 'F95 Gold', size: [90, 200], count: 6, prise: 10000, status: 11},
  {article: 5535467, name: 'S110 Gold', size: [120, 200], count: 0, prise: 10000, status: 11},
  {article: 6535467, name: 'Carbon', size: [90, 200], count: 1, prise: 10000, status: 11},
  {article: 7535467, name: 'Nitrogen', size: [140, 200], count: 3, prise: 10000, status: 11},
  {article: 8535467, name: 'Oxygen', size: [90, 200], count: 0, prise: 10000, status: 11},
  {article: 9535467, name: 'Fluorine', size: [160, 200], count: 1, prise: 10000, status: 11},
  {article: 1053546, name: 'Neon', size: [90, 200], count: 2, prise: 10000, status: 11},
];

@Component({
  selector: 'app-table',
  standalone: true,

  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, DecimalPipe, FormsModule],
})
export class TableComponent {
  displayedColumns: string[] = ['article', 'name', 'size', 'status', 'prise', 'count'];
  dataSource = new MatTableDataSource(ELEMENT_DATA)
  sortedData: PeriodicElement[]
  search: string = ''

  constructor() {
    this.sortedData = [...this.dataSource.data]
    console.log(this.search)
  }

  applyFilter(event: Event) {
    const copyList = [...this.dataSource.data];
    this.sortedData = copyList.filter(a => a.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: PeriodicElement, b: PeriodicElement) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'article':
          return this.compare(a.article, b.article, isAsc);

        case 'size':
          return this.compare(a.size[0], b.size[0], isAsc);

        case 'count':
          return this.compare(a.count, b.count, isAsc);

        case 'status':
          return this.compare(a.status, b.status, isAsc);

        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
