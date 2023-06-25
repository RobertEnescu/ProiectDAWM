import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    term = term.toLowerCase();

    return items.filter(item => {
      return item.nume.toLowerCase().includes(term) ||
             item.prenume.toLowerCase().includes(term) ||
             item.email.toLowerCase().includes(term) ||
             item.telefon.toLowerCase().includes(term) ||
             item.oras.toLowerCase().includes(term);
    });
  }
}
