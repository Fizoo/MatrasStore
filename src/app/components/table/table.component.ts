import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {CommonModule, DecimalPipe} from '@angular/common';
import {Mattress} from '../../../data/data';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FirebaseDataService} from "../../services/firebase-data.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {DialogElementComponent} from "./dialog-element/dialog-element.component";
import {combineLatest} from "rxjs";
import {FilterService} from "../../services/filter.service";

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
    MatInput,
    MatProgressSpinner,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose
  ]
})
export class TableComponent implements OnInit {


  displayedColumns: string[] = []
  columnDefs = [
    { columnDef: 'sku', header: 'Article', cell: (element: Mattress) => element.sku },
    { columnDef: 'name', header: 'Name', cell: (element: Mattress) => element.name },
    { columnDef: 'size', header: 'Size', cell: (element: Mattress) => element.size },
    { columnDef: 'status', header: 'Stat', cell: (element: Mattress) => element.status },
    { columnDef: 'price', header: 'Price', cell: (element: Mattress) => element.price },
    { columnDef: 'quantity', header: 'Quantity', cell: (element: Mattress) => element.quantity }
  ]

  dataSource: MatTableDataSource<Mattress> = new MatTableDataSource();
  sortedData: Mattress[] = []
  search: string = ''
  isLoading = true
  isError=''
  isEditFormOpen = false
  selectedMattress: Mattress


  constructor(private firebaseService:FirebaseDataService,private dialog: MatDialog,private filterService:FilterService) { }

  ngOnInit() {
    this.displayedColumns = this.columnDefs.map(c => c.columnDef)

    combineLatest([
      this.firebaseService.getAllMattresses(), // Потік з Firebase
      this.filterService.selectedNames$,
      this.filterService.selectedSizes$// Ваш rxjs потік
    ]).subscribe({
      next: ([allMattresses, names, sizes]) => {
        // Використовуємо дані з  джерел
        this.dataSource.data = allMattresses.filter(el =>{
          const matchesQuantity = el.quantity > 0;
          const matchesName = !names.length || names.includes(el.name); // Фільтр по іменах
          const matchesSize = !sizes.length || sizes.includes(el.size); // Фільтр по розмірах
          return matchesQuantity && matchesName && matchesSize;
        })
        this.sortedData = [...this.dataSource.data];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error retrieving data:', err);
        this.isError = err;
        this.isLoading = false;
      }
    });

    this.sortedData = [...this.dataSource.data].filter(el=>el.quantity>0)
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.sortedData = this.dataSource.filteredData;
  }

  openEditDialog(element: Mattress) {
    const dialogRef = this.dialog.open(DialogElementComponent, {
      width: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.updateMattress(result.sku, {
          price: result.price,
          quantity: result.quantity
        }).subscribe(() => ({
          // Після успішного оновлення, перезавантажуємо дані
         next: this.firebaseService.getAllMattresses().subscribe(data => {
            this.sortedData = data;
          }),
          error: (err:any) => {
            console.error('Error retrieving data:', err);
            this.isError = err.message;
            this.isLoading = false;
          }
        }));
      }
    });
  }


  updateMattress() {
    if (this.selectedMattress) {
      this.firebaseService.updateMattress(this.selectedMattress.sku, {
        price: this.selectedMattress.price,
        quantity: this.selectedMattress.quantity
      }).subscribe({
        next: () => {
          this.isEditFormOpen = false;
          this.firebaseService.getAllMattresses().subscribe({
            next: data => {
              this.dataSource.data = data;
              this.isLoading = false;
            },
            error: err => {
              console.error('Error retrieving data:', err);
              this.isError = err.message;
              this.isLoading = false;
            }
          });
        },
        error: err => {
          console.error('Error updating data:', err);
        }
      });
    }
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

  updateEl(element:Mattress) {
    this.firebaseService.updateMattress(element.sku, {quantity:1}).subscribe()
    console.log('hello')
    console.log(element)
  }
}
