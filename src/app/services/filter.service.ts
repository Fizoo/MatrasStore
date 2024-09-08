import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
   selectedNamesSubject = new BehaviorSubject<string[]>([]);
  private selectedSizesSubject = new BehaviorSubject<string[]>([]);

  selectedNames$ = this.selectedNamesSubject.asObservable();
  selectedSizes$ = this.selectedSizesSubject.asObservable();

  // Перезаписуємо ім'я у фільтрі
  addName(name: string) {
    this.selectedNamesSubject.next([name]);  // Перезаписуємо нове значення
  }

  // Видалення імені з фільтра
  removeName(name: string) {
    const currentNames = this.selectedNamesSubject.getValue();
    this.selectedNamesSubject.next(currentNames.filter(n => n !== name));
  }

  // Перезаписуємо розмір у фільтрі
  addSizes(sizes: string[]) {
    this.selectedSizesSubject.next([...sizes]);  // Перезаписуємо всі нові значення
  }

  addNames(names: string[]) {
    this.selectedNamesSubject.next([...names]);  // Перезаписуємо всі нові значення
  }

  // Видалення розміру з фільтра
  removeSize(size: string) {
    const currentSizes = this.selectedSizesSubject.getValue();
    this.selectedSizesSubject.next(currentSizes.filter(s => s !== size));
  }

  // Очистка фільтрів
  clearFilters() {
    this.selectedNamesSubject.next([]);
    this.selectedSizesSubject.next([]);
  }

  // Отримання поточного списку імен
  getSelectedNames(): string[] {
    return this.selectedNamesSubject.getValue();
  }

  // Отримання поточного списку розмірів
  getSelectedSizes(): string[] {
    return this.selectedSizesSubject.getValue();
  }
}
