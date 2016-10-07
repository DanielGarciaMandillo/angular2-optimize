import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { PolymerModule } from '../../polymer/polymer.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        PolymerModule
    ],
    exports: [
        HomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
