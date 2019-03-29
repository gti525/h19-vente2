import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderUpdateService {

	private notificationSource = new BehaviorSubject('blob');
	notification = this.notificationSource.asObservable();

  constructor() {}

  updateHeader() {
  	this.notificationSource.next('banana');
  }
}
