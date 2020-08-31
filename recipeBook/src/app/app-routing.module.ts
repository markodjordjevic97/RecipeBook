import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroPageComponent } from './hero-page/hero-page.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';


const routes: Routes = [
  {path: '',component: HeroPageComponent},
  {path: 'recipes',   component: RecipeComponent, children:[
    {path: '', component: RecipeStartComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: 'new',component: RecipeEditComponent},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: ':id/edit',  component: RecipeEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
