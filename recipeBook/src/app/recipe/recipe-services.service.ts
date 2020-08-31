import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeServicesService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chocolate Cake',
      'A super-tasty Chocolate cake - just awesome!',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80',
      [
        new Ingredient('Chocolate', 1),
        new Ingredient('Cream', 20)
      ]),
    new Recipe(' Strawberry',
      'What else you need to say?',
      'https://images.unsplash.com/photo-1563076429-c04cbe68da3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      [
        new Ingredient('Strawberry', 2),
        new Ingredient('Muffin', 1)
      ]),
      new Recipe('Kids Muffin',
      'What else you need to say?',
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      [
        new Ingredient('Magic', 2),
        new Ingredient('Muffin', 1)
      ]
      )
  ];

  constructor(private slService: ShoppingService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
