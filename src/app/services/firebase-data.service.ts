import { Injectable } from '@angular/core';
import {Database, ref, set, get, update, remove, child} from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { Mattress } from '../../data/data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private basePath = 'mattresses'; // Вказуємо основний шлях

  constructor(private db: Database) {}

  // Метод для додавання масиву матрасів
  addMattresses(mattresses: Mattress[]): Observable<void> {
    // Створюємо об'єкт, де ключами є sku
    const mattressesObject = mattresses.reduce((acc, mattress) => {
      acc[mattress.sku] = mattress;
      return acc;
    }, {} as { [key: number]: Mattress });

    const mattressesRef = ref(this.db, this.basePath);
    return from(set(mattressesRef, mattressesObject));
  }

  // Оновлення матраца за sku
  updateMattress(sku: number, updatedData: Partial<Mattress>): Observable<void> {
    const mattressRef = ref(this.db, `${this.basePath}/${sku}`);
    return from(update(mattressRef, updatedData));
  }

  getAllMattresses2(): Observable<Mattress[]> {
    const dbRef = ref(this.db);
    return from(get(child(dbRef, this.basePath)).then(snapshot => {
      if (snapshot.exists()) {
        // Приведення даних до типу масиву Mattress
        return snapshot.val() as Mattress[];
      } else {
        return [];
      }
    }));
  }

  // Отримання всіх матрасів
  getAllMattresses(): Observable<Mattress[]> {
    const dbRef = ref(this.db, this.basePath);
    return from(get(dbRef).then(snapshot => {
      if (snapshot.exists()) {
        // Приведення даних до типу масиву Mattress
        return Object.values(snapshot.val() as { [key: number]: Mattress });
      } else {
        return [];
      }
    }));
  }

  // Видалення матраца за sku
  deleteMattress(sku: number): Observable<void> {
    const mattressRef = ref(this.db, `${this.basePath}/${sku}`);
    return from(remove(mattressRef));
  }
}
