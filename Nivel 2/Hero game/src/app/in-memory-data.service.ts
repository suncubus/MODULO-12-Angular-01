import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Dr Nice', power: 2500000},
      { id: 2, name: 'Narco', power: 1660000 },
      { id: 3, name: 'Bombasto', power: 500000 },
      { id: 4, name: 'Celeritas', power: 1850000 },
      { id: 5, name: 'Magneta', power: 350000 },
      { id: 6, name: 'RubberMan', power: 3500000 },
      { id: 7, name: 'Dynama', power: 800000 },
      { id: 8, name: 'Dr IQ', power: 700000 },
      { id: 9, name: 'Magma', power: 7000 },
      { id: 0, name: 'Tornado', power: 2400000 }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
