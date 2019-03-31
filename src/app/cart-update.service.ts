import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {

	updates = new EventEmitter();

  constructor() { }

  updateCart() {
  	this.updates.emit();
  }

}
