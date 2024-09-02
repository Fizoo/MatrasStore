import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mattress } from "../../data/data";
import {dataActualMini} from "../../data/dataActualMini";
import {LocalStorageService} from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private database$: BehaviorSubject<Mattress[]> = new BehaviorSubject<Mattress[]>([]);
  private originalData: Mattress[] = dataActualMini;


  constructor(private localStorageService: LocalStorageService) {

    if (this.localStorageService.hasData()) {
      this.setData(this.localStorageService.loadData());
    } else {
      this.setData(this.originalData);
      this.localStorageService.saveData(this.originalData); // Збереження початкових даних
    }
  }


  get data$(): Observable<Mattress[]> {
    return this.database$.asObservable()

  }

  private setData(data: Mattress[]): void {
    this.database$.next(data)
    this.localStorageService.saveData(data)
  }

  addData(data: Mattress): void {
    const currentData = this.database$.getValue();
    this.setData([...currentData, data]);
  }

  removeData(data: Mattress): void {
    const currentData = this.database$.getValue();
    this.setData(currentData.filter(d => d.sku !== data.sku));
  }

  updateData(data: Mattress): void {
    const currentData = this.database$.getValue();
    this.setData(currentData.map(d => d.sku === data.sku ? data : d));
  }

  resetData(): void {
    this.setData(this.originalData);
  }

  filterData(sizes: string[], names: string[]): void {
    const currentData = this.originalData;
    const filteredData = currentData.filter(mattress =>
      (sizes.length === 0 || sizes.includes(mattress.size)) &&
      (names.length === 0 || names.includes(mattress.name))
    );
    this.setData(filteredData);
  }

  ngOnDestroy(): void {
    this.database$.complete();
  }
}
