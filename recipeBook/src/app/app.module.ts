import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { NotificationModule } from '@progress/kendo-angular-notification';
// Angular Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroPageComponent } from './hero-page/hero-page.component';
// Angular modules
import {AngularMaterial} from './angular.material';
import {CoreModule} from './core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeModule} from './recipe/recipe.module';
import {ShoppingModule} from './shopping-list/shopping.module';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinerComponent} from './shared/loading-spiner/loading-spiner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroPageComponent,
    AuthComponent,
    LoadingSpinerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
    AngularMaterial,
    CoreModule,
    RecipeModule,
    ShoppingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
