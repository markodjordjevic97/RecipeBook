import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';
import {firebaseService} from "../shared/firebase.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingService,
              private firebase: firebaseService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.firebase.fetchListIngredients().subscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  onSave() {
    this.firebase.postListIngredients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
