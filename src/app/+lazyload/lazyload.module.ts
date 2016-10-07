import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LazyLoadComponent, LazyLoadRoutes } from './index';
import { PolymerModule } from '../../polymer/polymer.module';

@NgModule({
    declarations: [
        LazyLoadComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        PolymerModule,
        RouterModule.forChild(LazyLoadRoutes)
    ],
    exports: [
        LazyLoadComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LazyLoadModule {
}
