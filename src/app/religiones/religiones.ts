import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
    selector: 'aplicacio',
    styleUrls: ['religions.css'],
    templateUrl: 'religiones.html',
    standalone: true,
    imports: [MatGridListModule,MatSidenavModule, NgIf, MatButtonModule, MatProgressBarModule],
  })   

export class Religiones implements OnInit{
    constructor(private route:ActivatedRoute,private router:Router){
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  showFiller1: boolean = false;
  showFiller2: boolean = false;
  showFiller3: boolean = false;
  showFiller4: boolean = false;

  toggleDrawer(drawerNumber: number): void {
    switch (drawerNumber) {
      case 1:
        this.showFiller1 = !this.showFiller1;
        break;
      case 2:
        this.showFiller2 = !this.showFiller2;
        break;
      case 3:
        this.showFiller3 = !this.showFiller3;
        break;
      case 4:
        this.showFiller4 = !this.showFiller4;
        break;
    }
  }
}