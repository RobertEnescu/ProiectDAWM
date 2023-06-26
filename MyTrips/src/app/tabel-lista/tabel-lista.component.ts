import { Component } from '@angular/core';
import { FilterPipe } from '../FilterPipe/filter.pipe';
import { SortPipe } from '../SortPipe/sort.pipe';

@Component({
  selector: 'app-tabel-lista',
  templateUrl: './tabel-lista.component.html',
  styleUrls: ['./tabel-lista.component.scss'],
  providers: [FilterPipe, SortPipe],
})
export class TabelListaComponent {
  intrare: any = {};
  intrari: any[] = [
    {
      nume: 'Paris',
      tara: 'Franta',
      dataVizitei: '2022',
      continent: 'Europa',
      locuitori: '2,161',
    },
    {
      nume: 'Tokyo',
      tara: 'Japonia',
      dataVizitei: '2023',
      continent: 'Asia',
      locuitori: '13,96',
    },
  ];
  termenCautare: string = '';
  sortareColoana: string = '';

  constructor(private filterPipe: FilterPipe, private sortPipe: SortPipe) {}

  adaugaIntrare() {
    this.intrari.push(Object.assign({}, this.intrare));
    this.intrare = {};
  }

  stergeIntrare(intrare: any) {
    const index = this.intrari.indexOf(intrare);
    if (index !== -1) {
      this.intrari.splice(index, 1);
    }
  }

  cautaIntrari() {
    this.termenCautare = this.termenCautare.trim();
  }

  sorteaza(coloana: string) {
    this.sortareColoana = coloana;
  }
}
