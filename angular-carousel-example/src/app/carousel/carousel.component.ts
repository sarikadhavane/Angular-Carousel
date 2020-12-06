import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { SlideService } from '../slide.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('rightAnimation', [
      transition('in<=>out', [
        style({ transform: 'translateX(30px)' }),
        animate(400)
      ])
    ]),
    trigger('leftAnimation', [
      transition('in<=>out', [
        style({ transform: 'translateX(-30px)' }),
        animate(400)
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  heading = 'What are you <b>here to do?</b>';
  slideData;
  displaySlide = 5;
  visibleSlide = [...Array(this.displaySlide).keys()].map(i => i);

  swipeArray = {
    startX: 0,
    startY: 0,
    dist: 0,
    threshold: 20,
    allowedTime: 500,
    elapsedTime: 0,
    startTime: 0,
    distX: 0,
    distY: 0,
    restraint: 100,
    currentX: 0,
    currentY: 0,
    swipeDir: 'none',
    rightState: 'out',
    leftState: 'out',
  };
  constructor(public slideServices: SlideService) {
    this.slideData = slideServices.getSlidesData();
    console.log(this.slideData)
  }

  ngOnInit() {
    this.getScreensize()
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.visibleSlide, event.previousIndex, event.currentIndex);
  }

  @HostListener('window:resize', ['$event'])
  getScreensize(event?): void {
    if (innerWidth >= 768 && innerWidth <= 1023) {
      this.displaySlide = 3;
    } else if (innerWidth >= 320 && innerWidth <= 768) {
      this.displaySlide = 1;
    } else if (innerWidth > 1023) {
      this.displaySlide = 5;
    }
    this.visibleSlide = [...Array(this.displaySlide).keys()].map(i => i);
  }

  btnClick(dir) {
    if (dir == 'prev') {
      this.swipeArray.leftState = this.swipeArray.leftState === 'in' ? 'out' : 'in';
      this.changeDirection(this.slideData, true);
    } else {
      this.swipeArray.rightState = this.swipeArray.rightState === 'in' ? 'out' : 'in';
      this.changeDirection(this.slideData, false);
    }

  }

  changeDirection(arr, reverse): string[] {
    if (reverse) {
      arr.unshift(arr.pop());
    } else {
      arr.push(arr.shift());
    }
    return arr;
  }
}
