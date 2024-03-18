import { Component, HostListener } from '@angular/core';

@Component({
selector: 'aplicacio',
templateUrl: './inicio.html',
styleUrls: ['./inicio.css']
})
export class Inicio {
    mostrarElementos: boolean = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const triggerScroll = 0.4; 

    if (scrollPosition > windowHeight * triggerScroll) {
        this.mostrarElementos = true;
    } else {
        this.mostrarElementos = false;
    }
    }

    toggleImage() {

    }
}
