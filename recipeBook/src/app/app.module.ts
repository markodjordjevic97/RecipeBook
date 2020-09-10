import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// Angular Components
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroPageComponent } from './hero-page/hero-page.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component'
import { AuthComponent } from './auth/auth.component';
// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { NotificationModule } from '@progress/kendo-angular-notification';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// Angular services
import {ShoppingService} from './shopping-list/shopping.service'
import {RecipeServicesService} from './recipe/recipe-services.service';
import { GalleryService } from './hero-page/gallery.service';
import { LoadingSpinerComponent } from './shared/loading-spiner/loading-spiner.component';
import {authInterceptorService} from "./auth/auth-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    ShoppingListComponent,
    HeaderComponent,
    FooterComponent,
    HeroPageComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListEditComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [ShoppingService, RecipeServicesService, GalleryService, {provide: HTTP_INTERCEPTORS, useClass: authInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
