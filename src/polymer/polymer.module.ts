import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PolymerBinding } from './polymer.binding';
import { HomeModule } from '../app/home/home.module';

@NgModule({
    declarations: [
        PolymerBinding
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PolymerBinding
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PolymerModule {
    constructor() {
        console.log('Polymer module init')
    }
}
