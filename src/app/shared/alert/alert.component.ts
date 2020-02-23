import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
    messages: string[] = [];
    class: string = 'alert-success';
    alertSubscription: Subscription;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertSubscription = this.alertService.alert.subscribe(
            alert => {
                if(Array.isArray(alert.messages)) {
                    this.messages = alert.messages;
                } else {
                    this.messages = [alert.messages];
                }

                if(alert.hasOwnProperty('class')) {
                    this.class = alert.class;
                }
            }
        )
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
    }
}