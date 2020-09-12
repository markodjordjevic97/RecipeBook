import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeServicesService} from "../recipe/recipe-services.service";
import { map, tap} from "rxjs/operators";
import {Recipe} from "../recipe/recipe.model";
import {ShoppingService} from "../shopping-list/shopping.service";
import {Ingredient} from "./ingredient.model";
import {likesService} from "../header/likes.service";


@Injectable({
  providedIn: 'root'
})

export class firebaseService {

  constructor(private http: HttpClient,
              private recipeService: RecipeServicesService,
              private ingredientsService: ShoppingService,
              private likes: likesService) {
  }

  postData() {
    const recipes = this.recipeService.getRecipes();
    this.http.put<{key: string}>(
      'https://recipebook-2020.firebaseio.com/recipes.json',
      recipes).subscribe();
  }

  fetchData() {
      return this.http.get<Recipe[]>(
        'https://recipebook-2020.firebaseio.com/recipes.json'
      ).pipe(
     map(recipes => {
        return recipes.map(recipe => {
          return {ingredients: recipe.ingredients ? recipe.ingredients : [], ...recipe}
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  }

  postListIngredients() {
    const ingredients = this.ingredientsService.getIngredients();
    this.http.put(
      'https://recipebook-2020.firebaseio.com/ingredients.json', ingredients
    ).subscribe();
  }
  //setIngredients
  fetchListIngredients() {
  return this.http.get<Ingredient[]>(
    'https://recipebook-2020.firebaseio.com/ingredients.json'
  ).pipe(
    tap(ingredients => {
      this.ingredientsService.setIngredients(ingredients);
    })
  )
  }

  postLikes() {
    const counter = this.likes.getLikes().length;
    this.http.put('https://recipebook-2020.firebaseio.com/likes.json', counter).subscribe();
  }

  fetchLikes(){
    return this.http.get<number>('https://recipebook-2020.firebaseio.com/likes.json')
                    .pipe(tap(num => {
                      this.likes.setLikes(num);
                    }))

  }
}
