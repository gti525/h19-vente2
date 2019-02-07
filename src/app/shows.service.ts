import { Injectable } from '@angular/core';
import { Show, SHOWS } from './types/show';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  getShows(): Show[] {
  	return SHOWS;
  }
}
