import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodolistComponent, TodolistRoutes } from './index';

@NgModule({
    declarations: [
        TodolistComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(TodolistRoutes)
    ],
    exports: [
        TodolistComponent
    ]
})
export class TodolistModule {
}
