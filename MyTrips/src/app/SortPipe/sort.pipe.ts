import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(items: any[], coloana: string): any[] {
    if (!items || !coloana) {
      return items;
    }

    return items.sort((a, b) => {
      const valoareA = a[coloana].toLowerCase();
      const valoareB = b[coloana].toLowerCase();

      if (valoareA < valoareB) {
        return -1;
      } else if (valoareA > valoareB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
