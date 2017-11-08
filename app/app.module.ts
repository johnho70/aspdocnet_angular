import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule, FormsModule ],
    declarations: [ AppComponent, AppRoutingModule.components ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }