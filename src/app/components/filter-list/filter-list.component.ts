import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {combineLatest, map, Observable} from "rxjs";
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatIcon
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss'
})
export class FilterListComponent implements OnInit{
  totalItems = 4000; // Логіка для підрахунку знайдених елементів
  activeFilters$: Observable<string[]>
  activeFilters: string[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    // Підписуємося на зміни в потоках імен та розмірів
    this.activeFilters$ = combineLatest([
      this.filterService.selectedNames$,
      this.filterService.selectedSizes$
    ]).pipe(
      map(([names, sizes]) => {
        return [...names, ...sizes];  // Об'єднуємо імена і розміри в один масив
      })
    );
  }

  clearAllFilters(): void {
    this.filterService.clearFilters();
  }

  removeFilter(filter: string): void {
    const currentNames = this.filterService.getSelectedNames();
    const currentSizes = this.filterService.getSelectedSizes();

    if (currentNames.includes(filter)) {
      this.filterService.removeName(filter);  // Видаляємо ім'я
    } else if (currentSizes.includes(filter)) {
      this.filterService.removeSize(filter);  // Видаляємо розмір
    }
  }


}
