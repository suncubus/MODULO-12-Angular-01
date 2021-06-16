import { Hero } from './hero';
export interface Gamer {
    id: number;
    name: string;
    points: number;
    cards?: Hero[];

  }