import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {likesService} from "./likes.service";
import {firebaseService} from "../shared/firebase.service";
import {authService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  counter: number = 0;
  clicked: boolean = false;
  buttonClass: string = 'burger-btn';

  isAuth =  false;
  constructor(private firebase: firebaseService,
              private likeService: likesService,
              private authet: authService) { }

  ngOnInit(): void {
      this.firebase.fetchLikes().subscribe(num => {
        this.counter = num;
      })

    this.subscription = this.authet.user.subscribe(user => {
      this.isAuth = !!user;
    })
  }
  pageLikes() {
    this.clicked = true;
    if(this.counter === null) {
      this.counter = 0;
    }
    else{
      this.counter++;
    }
    this.likeService.addLikes(this.counter);
    this.firebase.postLikes();
  }

  SignInOut() {
    if(this.isAuth){
    this.authet.logout();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

