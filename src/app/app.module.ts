import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {appRoutingProviders, routing} from "./app.routing";
import {HomeModule} from "./home/home.module";
import {NotFound404Component} from "./notfound.component";

@NgModule({
    declarations: [
        AppComponent,
        NotFound404Component
    ],
    imports: [
        BrowserModule,
        HomeModule,
        routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
