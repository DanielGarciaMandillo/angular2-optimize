import {async, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {LazyLoadComponent} from "./lazyload.component";


@Component({
    selector: 'as-test',
    template: '<as-lazyload></as-lazyload>'
})
class TestComponent {
}

describe('LazyLoadComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LazyLoadComponent ]
        });
    });

    it('element should be test', async(() => {
        TestBed.compileComponents().then(() => {
            expect(true).toEqual(true);
        });
    }));
});
