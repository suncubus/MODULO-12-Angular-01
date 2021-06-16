import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Gamer } from '../gamer';
import { GAMER } from '../mock-gamers';

@Component({
  selector: 'app-gamers',
  templateUrl: './gamers.component.html',
  styleUrls: ['./gamers.component.css']
})
export class GamersComponent implements OnInit {

  gamers: Gamer[] = GAMER;
  
  constructor() { }

  ngOnInit(): void {
   
  }


  //eliminamos el Gamer seleccionado del array
  delete(gamer:Gamer):void{
    if (!gamer) { return; }
    this.gamers.splice(this.gamers.indexOf(gamer),1);
  }

  addGamer(name: string): void {
    if (!name) { return; }
    let aux:Gamer = {id:this.gamers.length + 1,name:name, points:0}
    this.gamers.push(aux);
  
  }
}
