import { Injectable } from '@angular/core';
import {Database, ref, set, get, update, remove, child} from '@angular/fire/database';
import {Observable, from, map, combineLatest} from 'rxjs';
import { Mattress } from '../../data/data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private basePath = 'mattresses'; // Вказуємо основний шлях

  constructor(private db: Database) {}

  // Метод для додавання масиву матрасів
  addMattresses(mattresses: Mattress): Observable<void> {
    // Отримуємо посилання на базу даних, де використовуємо поле SKU як ключ
    const mattressRef = ref(this.db, `${this.basePath}/${mattresses.sku}`);

    // Використовуємо Firebase 'set' для додавання або оновлення даних
    return from(set(mattressRef, mattresses));
  }

  // Оновлення матраца за sku
  updateMattress(sku: number, updatedData: Partial<Mattress>): Observable<void> {
    const mattressRef = ref(this.db, `${this.basePath}/${sku}`)
    return from(update(mattressRef, updatedData))
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

  filterMattresses(selectedSizes: string[], selectedNames: string[]): Observable<Mattress[]> {
    return this.getAllMattresses().pipe(
      map(mattresses => {
        return mattresses.filter(mattress => {
          const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(mattress.size);
          const matchesName = selectedNames.length === 0 || selectedNames.includes(mattress.name);
          return matchesSize && matchesName;
        });
      })
    );
  }

  addMattressesArray(mattresses: Mattress[]): Observable<void[]> {
    const tasks: Observable<void>[] = mattresses.map(mattress => {
      const mattressRef = ref(this.db, `${this.basePath}/${mattress.sku}`);
      return from(set(mattressRef, mattress));
    });

    // Використовуємо combineLatest для того, щоб виконати всі операції одночасно
    return combineLatest(tasks);
  }
}
