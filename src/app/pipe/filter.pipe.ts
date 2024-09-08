import { Pipe, PipeTransform } from '@angular/core';
import {Mattress} from "../../data/data";

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: Mattress[], selectedNames: string[], selectedSizes: string[]): Mattress[] {
    if (!items) return [];

    return items.filter(item => {
      const matchesName = !selectedNames.length || selectedNames.includes(item.name);
      const matchesSize = !selectedSizes.length || selectedSizes.includes(item.size);
      return matchesName && matchesSize;
    });
  }

}
