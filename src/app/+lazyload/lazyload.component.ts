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
  mode1: string;
  plSelect: string;
  plTextarea: string;
  constructor() {
    this.mode = 'danger';
    this.mode1 = 'info';
    this.plTextarea = 'Mi textarea content';
  }

  showEvent(detail: any) {
    console.log(detail);
  }
}
