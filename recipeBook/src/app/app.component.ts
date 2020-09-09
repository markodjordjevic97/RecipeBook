import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NotificationService} from "@progress/kendo-angular-notification";
import {MessageService} from "./shared/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'recipeBook';

  message: any[] = [];
  subscription: Subscription;
  private hideAfter: number = 2000;
  constructor(private messageService: MessageService,
              private notification: NotificationService) {
  }
  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe(messageGet =>{
        if(messageGet) {
          this.notification.show({
            content: messageGet.message,
            animation: {type: "slide", duration: 400},
            position: {horizontal: "center", vertical: "top"},
            type: {style: "success", icon: true},
            hideAfter: this.hideAfter
          })
        }
        else
          this.message = [];
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
