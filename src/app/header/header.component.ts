import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  key;
  constructor(
  ) { }

  ngOnInit() {
    if (true) {
      this.login = true;
    } else {
      // this.login = false;
    }
  }

}
