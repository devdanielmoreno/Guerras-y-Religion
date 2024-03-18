import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'aplicacio',
  templateUrl: './routing.html',
  styleUrls: ['./routing.css'],

})
export class Routing {
  sidenavOpened = false;
  isHovered: boolean = false;

  enter() {
    this.isHovered = true;
  }

  leave() {
    this.isHovered = false;
  }
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
