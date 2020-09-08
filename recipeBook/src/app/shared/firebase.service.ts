import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeServicesService} from "../recipe/recipe-services.service";
import {map, tap} from "rxjs/operators";
import {Recipe} from "../recipe/recipe.model";

@Injectable({
  providedIn: 'root'
})

export class firebaseService {

  constructor(private http: HttpClient,
              private recipeService: RecipeServicesService) {
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
      })
    )
  }
}
