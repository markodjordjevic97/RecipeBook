import {Component,  OnInit} from '@angular/core';
import {likesService} from "./likes.service";
import {firebaseService} from "../shared/firebase.service";
import {authService} from "../auth/auth.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  subscription: Subscription
  counter: number = 0;
  clicked: boolean = false;
  buttonClass: string = 'burger-btn'
  mode: boolean = false;
  constructor(private firebase: firebaseService,
              private likeService: likesService,
              private auth: authService) { }

  ngOnInit(): void {
    if (this.mode) {
      this.firebase.fetchLikes().subscribe(num => {
        this.counter = num;
      })
    } else {
      //....
    }
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
}
