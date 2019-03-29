import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class HeaderUpdateService {

	updates = new EventEmitter();

  constructor() {}

  updateHeader() {
  	this.updates.emit();
  }
}
