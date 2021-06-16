import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  //añade a la cache
  add(message: string) {
    this.messages.push(message);
  }

  //limpia la cache
  clear() {
    this.messages = [];
  }
}