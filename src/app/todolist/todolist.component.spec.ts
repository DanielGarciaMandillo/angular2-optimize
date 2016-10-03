import {
    async,
    TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';

import { TodolistComponent } from './todolist.component';


@Component({
    selector: 'as-test',
    template: '<as-todolist></as-todolist>'
})
class TestComponent {
}

describe('TodolistComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TodolistComponent ]
        });
    });

    it('element should be test', async(() => {
        TestBed.compileComponents().then(() => {
            expect(true).toEqual(true);
        });
    }));
});
