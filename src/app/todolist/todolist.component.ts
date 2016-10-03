import { Component } from '@angular/core';


@Component({
    selector: 'as-todolist',
    templateUrl: 'todolist.component.html',
    styleUrls: [
        'todolist.component.css'
    ]
})
export class TodolistComponent {
    private hello: string;

    constructor() {
        this.hello = 'Hello';
    }
}
