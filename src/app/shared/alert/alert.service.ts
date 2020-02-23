import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
    alert = new Subject<{ messages: string | string[], class: string | null }>();
}
