import { Component } from '@angular/core';


@Component({
    selector: 'as-lazyload',
    templateUrl: 'lazyload.component.html',
    styleUrls: [
        'lazyload.component.css'
    ]
})
export class LazyLoadComponent {
    private hello: string;

    constructor() {
        this.hello = 'Hello';
    }
}
