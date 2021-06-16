import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Gamer } from '../gamer';
import { GAMER } from '../mock-gamers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  gamers: Gamer[] = GAMER;  

  
  topGamers: Gamer[] = [];  


  constructor(private heroService: HeroService) { }

 ngOnInit() {
    this.getHeroes();
    this.orderTopGamers();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  orderTopGamers(){
    //Ordenamos el array por puntuación más altas es mayor lo guardo en la posición actual
    let auxiliar:Gamer;
    for(let i=0;i<this.gamers.length;i++){    
      for(let j=i+1; j < this.gamers.length; j++){
          if(this.gamers[j].points>this.gamers[i].points){
              auxiliar=this.gamers[j];
              this.gamers[j]=this.gamers[i];
              this.gamers[i]=auxiliar;
          }
      }
    }  

    //Guardamos en nuevo array solo los top, los cuatro primeros
    for (let i = 0; i < 4; i++) {
      this.topGamers.push(this.gamers[i]);
    }
}
}
