import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSearch: boolean = false;
  searchData;
  devicesType = 0;
  isMobileMenu : boolean = false;

  @HostListener('window:resize', ['$event'])
  getScreensize(event?) {
    let innerWidth = window.innerWidth;
    if (innerWidth >= 768 && innerWidth <= 1023) {
      this.devicesType = 2;
      this.isMobileMenu = false;
    } else if (innerWidth >= 320 && innerWidth <768) {
      this.devicesType = 3;
      this.isMobileMenu = false;
    } else if (innerWidth > 1023) {
      this.devicesType = 1;
    }
  }

  constructor() { }

  ngOnInit() {
    this.getScreensize();
  }
  toggleSearch() {
    console.log('i')
    this.isSearch = !this.isSearch;
  }
  clearSearch() {
    this.searchData = '';
  }
  search(){
    
  }


}
