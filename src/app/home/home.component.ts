import { Component } from '@angular/core';

@Component({
    selector: 'main-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ]
})
export class HomeComponent {
    welcome: string;

    constructor() {
        this.welcome = 'This is the HomeComponent';
    }
}
