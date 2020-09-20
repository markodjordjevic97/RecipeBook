import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipe/recipe.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {RecipeServicesService} from '../recipe/recipe-services.service';
import {firebaseService} from './firebase.service';

@Injectable({
  providedIn: 'root'
})

export class recipeResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipeServicesService,
              private firebase: firebaseService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const arrayRecipes = this.recipeService.getRecipes();
    if (arrayRecipes.length < 1){
      return this.firebase.fetchData();
    }
    else {
      return arrayRecipes;
    }
  }

}
