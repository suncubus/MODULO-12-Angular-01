import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Gamer } from '../gamer';
import { GAMER } from '../mock-gamers';

@Component({
  selector: 'app-gamer-detail',
  templateUrl: './gamer-detail.component.html',
  styleUrls: ['./gamer-detail.component.css']
})
export class GamerDetailComponent implements OnInit {

  gamers: Gamer[] = GAMER;
  
  gamer: Gamer[] = [];
  id:number=0;

  constructor(
    private routeGamerDetail: ActivatedRoute,
    private location: Location,
    
  ) {  }

  ngOnInit():void{
    //seleccionamos el elemento que tenga ese id
    this.id = Number(this.routeGamerDetail.snapshot.params.id);
    //restamos uno para saber la posición del array
    this.id = this.id - 1;
  }

  
  save(): void {
    if (this.gamer) {
      this.gamers.push(this.gamers[this.id]) ;
      this.location.back()
    }
  }
}
