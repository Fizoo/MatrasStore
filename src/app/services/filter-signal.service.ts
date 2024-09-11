import {Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterSignalService {

  private selectedNames = signal<string[]>([]);
  private selectedSizes = signal<string[]>([]);

  get selectedNamesSignal(): Signal<string[]> {
    return this.selectedNames;
  }

  get selectedSizesSignal(): Signal<string[]> {
    return this.selectedSizes;
  }

  addName(namesToAdd: string[]): void {
    this.selectedNames.update(currentNames => [...currentNames, ...namesToAdd]);
  }

  removeName(name: string): void {
    this.selectedNames.update(names => names.filter(n => n !== name));
  }

  addSize(sizesToAdd: string[]): void {
    this.selectedSizes.update(currentSizes => [...currentSizes, ...sizesToAdd]);
  }

  removeSize(size: string): void {
    this.selectedSizes.update(sizes => sizes.filter(s => s !== size));
  }

  clearFilters(): void {
    this.selectedNames.set([]);
    this.selectedSizes.set([]);
  }
}
