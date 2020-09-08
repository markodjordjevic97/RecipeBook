import { Component, OnInit } from '@angular/core';
import {likesService} from "./likes.service";
import {firebaseService} from "../shared/firebase.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  counter: number = 0;
  clicked: boolean = false;
  constructor(private firebase: firebaseService,
              private likeService: likesService) { }

  ngOnInit(): void {
  this.firebase.fetchLikes().subscribe(num => {
    this.counter = num;
  });
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
