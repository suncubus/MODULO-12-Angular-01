import {Component, ElementRef, ViewChild, OnInit, AfterContentInit  } from '@angular/core';

import { Gamer } from '../gamer';
import { GAMER } from '../mock-gamers';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent
{
  /*ngOnInit(){
    setTimeout(() => {
      this.restartGame();
    }, 1000);
   
  }*/
  ngAfterContentInit(){
      this.restartGame();   
  }

  //todos los jugadores
  gamers: Gamer[] = GAMER;  
  //todos los heroes
  heroes: Hero[] = [];

  //array donde guardaremos los jugadores
  selectedGamers: Gamer[] = [];

  //variables del html
  p1:string = '';
  p2:string = '';
  po1:string = '';
  po2:string = '';

  displayCard: boolean = false;

  count:number = 0;//cada ronda
  countGame:number = 0;//cada partida
  heroName1:string;
  heroPower1:number;
  heroName2:string;
  heroPower2:number;

  //puntos por partida
  points1:number = 0; 
  points2:number = 0; 

  /*ELEMENTOS HTML*/
  @ViewChild('player1',{static: true}) player1 : ElementRef;
  @ViewChild('player2',{static: true}) player2 : ElementRef;

  @ViewChild('sectionCards1',{static: true}) sectionCards1 : ElementRef;
  @ViewChild('sectionCards2',{static: true}) sectionCards2 : ElementRef;
  
  @ViewChild('cards1',{static: true}) cards1 : ElementRef;
  @ViewChild('cards2',{static: true}) cards2 : ElementRef;

  @ViewChild('board1',{static: true}) board1 : ElementRef;
  @ViewChild('board2',{static: true}) board2 : ElementRef;

  @ViewChild('play',{static: true}) play : ElementRef;
  @ViewChild('game',{static: true}) game : ElementRef;

  @ViewChild('modal',{static: true}) modal : ElementRef;

  //arrays de cards por jugador
  gamerCards1: String[] = ['00','01','02','03','04'];
  gamerCards2: String[] = ['10','11','12','13','14'];

  //random array
  randomHero:Hero[] = []

  constructor(private heroService: HeroService, private elementRef: ElementRef)  {        
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);  //obtenemos el array de heroes     
  }  
  selectPlayer(selectedGamer:any, num:number):void{  
    this.enableElements(this.player1, true);//select 1
    this.enableElements(this.player2, false);//select2
    this.displayElements(this.play, true);      
    this.selectedGamers[num-1] = this.gamers[selectedGamer-1];//Guardamos el jugador seleccionado en la posición concreta            
    if(this.selectedGamers.length === 2){
      this.enableElements(this.player2, true);
      this.randomHeroes();
      console.log(this.selectedGamers[0].cards.length + " - "+ this.selectedGamers[0].cards.length)
      //Mostramos datos de los jugadores
      this.p1 = ' '+ this.selectedGamers[0].name;           
      this.po1 = " - POINTS: " + this.selectedGamers[0].points.toString();
      this.p2 = ' '+this.selectedGamers[1].name; 
      this.po2 = " - POINTS: " + this.selectedGamers[1].points.toString();  
      //inicializo a azul y muestro board
      this.changeClass(this.board1,"border-yellow","border-blue");
      this.changeClass(this.board2,"border-yellow","border-blue");
      this.displayElements(this.cards1, false);
      this.displayElements(this.cards2, false);      
      this.displayCard = true; 
      this.game.nativeElement.classList.add("container");
    }
  }
  //asignamos 5 heroes a cada jugador 
  randomHeroes():void{
   this.selectedGamers.forEach(elementGamer => {
      this.randomNumbers();
      this.randomHero.forEach(element => {
        elementGamer.cards.push( element);
      });             
    });
  }
  randomNumbers():void{         
    this.randomHero = this.heroes.slice();//clono array    
    this.randomHero.sort(() => Math.random() > 0.5 ? 1 : -1);//lo desordeno
    this.randomHero = this.randomHero.slice(0, 5);//cojo solo 5
  }
  //seleccionan cartas
  selectedHero(selectedGamer:number,hero:number){
    //creo el id del botón pulsado
    let id:string = selectedGamer.toString() + hero.toString();
    this.displayCards(id,'none');

    if(selectedGamer === 0){
      this.heroName1=this.selectedGamers[selectedGamer].cards[hero].name;
      this.heroPower1=this.selectedGamers[selectedGamer].cards[hero].power;
      this.enableCards(this.gamerCards1,true);
    }else{
      this.heroName2=this.selectedGamers[selectedGamer].cards[hero].name;
      this.heroPower2=this.selectedGamers[selectedGamer].cards[hero].power;  
      this.enableCards(this.gamerCards2,true);
    }
    //Tienen que haber elegido los dos carta
    this.count === 1 ?  this.playGame() : this.count++;
  }
  //puntuacion de cada baza
  playGame():void{    
    if(this.heroPower1 > this.heroPower2){      
      this.points1 += 10;
      this.changeClass(this.board1,"border-blue","border-yellow");
    }else if( this.heroPower1 < this.heroPower2){
      this.points2 += 10;     
      this.changeClass(this.board2,"border-blue","border-yellow");
    }else{
      //empate
      this.points1 += 10;
      this.changeClass(this.board1,"border-blue","border-yellow");
      this.points2 += 10;     
      this.changeClass(this.board2,"border-blue","border-yellow");
    }
    setTimeout (() => {this.restartBoard()}, 2000);
  }

  //restaurar cartas para la siguiente baza
  restartBoard():void{
    this.heroName1=" ";
    this.heroPower1 = undefined;
    this.heroName2=" ";
    this.heroPower2 = undefined;
    this.changeClass(this.board1,"border-yellow","border-blue");
    this.changeClass(this.board2,"border-yellow","border-blue"); 
    this.enableCards(this.gamerCards1,false);
    this.enableCards(this.gamerCards2,false); 
    this.count = 0;  
    //Tienen que haber elegido los dos carta
    this.countGame === 4 ?  this.finishGame() : this.countGame++;
  }

  finishGame():void{
    if(this.points1 > this.points2){
      //You win 1
      this.p1 = 'YOU WIN! '+ this.selectedGamers[0].name;  
      this.changeClass(this.board1,"border-blue","border-yellow");
    }else if(this.points2 > this.points1){
      //You win 2
      this.p2 = 'YOU WIN! '+ this.selectedGamers[1].name;   
      this.changeClass(this.board2,"border-blue","border-yellow");
    }else{
      //empate
      this.p1 = 'YOU HAVE TIEED! '+ this.selectedGamers[0].name;
      this.p2 = 'YOU HAVE TIEED! '+ this.selectedGamers[1].name;      
      this.changeClass(this.board1,"border-blue","border-yellow");
      this.changeClass(this.board2,"border-blue","border-yellow");
    }
    //sumar los puntos al array de Gamers 
    this.selectedGamers[0].points += this.points1;
    this.selectedGamers[1].points += this.points2;
    this.displayElements(this.play, false);    
  }
  restartGame():void{
    this.displayElements(this.play, true);   
    this.selectedGamers.forEach(elementGamer => {
      this.randomHero.forEach(element => {
        elementGamer.cards.splice(0,5);
        console.log(elementGamer.cards);


      });             
    });
    this.selectedGamers = [];
    this.p1 = '';
    this.p2 = '';
    this.po1 = '';
    this.po2 = '';
    this.displayCard = false;
    this.count = 0;
    this.countGame = 0;
    this.heroName1 = " ";
    this.heroPower1 = null;
    this.heroName2 = " ";
    this.heroPower2 = null;
    this.points1 = 0; 
    this.points2 = 0; 
    this.randomHero = [];
    this.game.nativeElement.classList.remove('container');
    this.displayElements(this.game, true);    
    this.enableElements(this.player1, false);
  }
  playAgain():void{
    this.restartGame();
  }
  //mostrar u ocultar elementos html
  displayElements(element:ElementRef, state:Boolean):void{ 
    element.nativeElement.hidden = state;
  }  
  //inhabilitar  elementos html
  enableElements(element:ElementRef, state:Boolean):void{    
    element.nativeElement.disabled = state;
  } 
  //mostrar u ocultar, habilitar y deshabilitar las cards
  displayCards(id:string, state:string):void{
    document.getElementById(id).style.display = state;
  }
  enableCards(gamerCards:String[],state:Boolean):void{ 
    if(state){     
      gamerCards.forEach(element => {
        document.getElementById(element.toString()).setAttribute("disabled","disabled")
        document.getElementById(element.toString()).classList.remove('active');
        document.getElementById(element.toString()).classList.add('not-active');        
      });
    }else{
      gamerCards.forEach(element => {
        document.getElementById(element.toString()).removeAttribute("disabled");
        document.getElementById(element.toString()).classList.remove('not-active');
        document.getElementById(element.toString()).classList.add('active');         
      });
    }   
    //element.style.display = element.style.display === 'none' ? 'block' : 'none'; 
  }  
  //cambiar clases
  changeClass(element:ElementRef, className1:string, className2:string):void{    
    element.nativeElement.classList.remove(className1);
    element.nativeElement.classList.add(className2);
  }
}
