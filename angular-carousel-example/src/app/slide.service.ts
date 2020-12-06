import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor() { }
  getSlidesData(): object{
    return  [
      { url: 'assets/slide.png', text: 'Mobile internet'},
      { url: 'assets/slide.png', text: 'Home internet'},
      { url: 'assets/slide.png', text: 'Get a device'},
      { url: 'assets/slide.png', text: 'Add a phone-line'},
      { url: 'assets/slide.png', text: 'Upgrade'} 
    ];
  }
}
