import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Ingredient} from "./ingredient.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ShoppingService} from "../shopping-list/shopping.service";
import {firebaseService} from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class shoppingListResolverService implements Resolve<Ingredient[]> {
  constructor(private ingredient: ShoppingService,
              private firebase: firebaseService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ingredient[]> | Promise<Ingredient[]> | Ingredient[] {
    const ingredient = this.ingredient.getIngredients();
    if(ingredient.length < 1){
      return this.firebase.fetchListIngredients();
    }
    else {
      return ingredient;
    }
  }

}
