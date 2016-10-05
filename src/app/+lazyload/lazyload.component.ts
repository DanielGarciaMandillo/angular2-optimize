import { Component } from '@angular/core';


@Component({
    selector: 'as-lazyload',
    templateUrl: 'lazyload.component.html',
    styleUrls: [
        'lazyload.component.css'
    ]
})
export class LazyLoadComponent {
  mode: string;
  constructor() {
    this.mode = 'danger';
  }
}
