import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
// Angular services
import {ShoppingService} from './shopping-list/shopping.service'
import {RecipeServicesService} from './recipe/recipe-services.service';

import { GalleryService } from './hero-page/gallery.service';

import {Pipeline} from "./header/shorthen.pipe";
import { SearchTextPipe } from './recipe/recipe-list/search-text.pipe';


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
    Pipeline,
    SearchTextPipe
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
    FormsModule
  ],
  providers: [ShoppingService,RecipeServicesService,GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
