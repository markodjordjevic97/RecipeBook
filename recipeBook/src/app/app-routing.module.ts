import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroPageComponent } from './hero-page/hero-page.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import {recipeResolverService} from "./shared/recipe-resolver.service";
import {shoppingListResolverService} from "./shared/shoppingList-resolver.service";


const routes: Routes = [
  {path: '', component: HeroPageComponent},
  {path: 'recipes', component: RecipeComponent, resolve: {res: recipeResolverService},  children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit',  component: RecipeEditComponent}

  ]},
  {path: 'shopping-list', component: ShoppingListComponent, resolve: {res: shoppingListResolverService}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
