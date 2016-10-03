import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LazyLoadComponent, LazyLoadRoutes } from './index';

@NgModule({
    declarations: [
        LazyLoadComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(LazyLoadRoutes)
    ],
    exports: [
        LazyLoadComponent
    ]
})
export class LazyLoadModule {
}
