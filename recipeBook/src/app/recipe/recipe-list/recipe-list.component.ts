import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServicesService } from '../recipe-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {firebaseService} from "../../shared/firebase.service";
import {MessageService} from "../../shared/message.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  searchText = '';
  datum = new Date();
  constructor(private recipeService: RecipeServicesService,
              private router: Router,
              private route: ActivatedRoute,
              private firebase: firebaseService,
              private message: MessageService) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
    this.firebase.fetchData().subscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSave() {
    this.firebase.postData();
    this.message.sendMessage('Your recipes have been successfully preserved!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
