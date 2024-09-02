import { Injectable } from '@angular/core';
import { Mattress } from "../../data/data";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageKey = 'mattressData';

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  saveData(data: Mattress[]): void {
    if (this.isLocalStorageAvailable()) {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(this.storageKey, jsonData);
    } else {
      console.error('localStorage не доступний у цьому середовищі');
    }
  }

  // Зберігає дані у LocalStorage
  loadData(): Mattress[] {
    if (this.isLocalStorageAvailable()) {
      const jsonData = localStorage.getItem(this.storageKey);
      return jsonData ? JSON.parse(jsonData) : [];
    } else {
      console.error('localStorage не доступний у цьому середовищі');
      return [];
    }
  }

  hasData(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.storageKey) !== null;
    } else {
      console.error('localStorage не доступний у цьому середовищі');
      return false;
    }
  }

  // Очищує дані з LocalStorage
  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }



  // Додає нові дані до існуючих
  addData(newData: Mattress): void {
    const currentData = this.loadData();
    currentData.push(newData);
    this.saveData(currentData);
  }

  // Оновлює існуючі дані в LocalStorage
  updateData(updatedData: Mattress): void {
    const currentData = this.loadData();
    const index = currentData.findIndex(d => d.sku === updatedData.sku);
    if (index !== -1) {
      currentData[index] = updatedData;
      this.saveData(currentData);
    }
  }

  // Видаляє дані з LocalStorage
  removeData(sku: number): void {
    const currentData = this.loadData();
    const updatedData = currentData.filter(d => d.sku !== sku);
    this.saveData(updatedData);
  }
}
