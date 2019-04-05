import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderUpdateService {

	// Update the header (reload)
	updates = new EventEmitter();

	// Update error message
	private errorMessageSource = new BehaviorSubject('');
	errorMessage = this.errorMessageSource.asObservable();

  constructor() {}

  updateHeader() {
  	this.updates.emit();
  }

  changeErrorMessage(message: string) {
  	this.errorMessageSource.next(message);
  }
}
