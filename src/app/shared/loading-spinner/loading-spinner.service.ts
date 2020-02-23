import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingSpinnerService {

    isLoading = new Subject<boolean>();

    show() {
        this.isLoading.next(true);
    }
    
    hide() {
        this.isLoading.next(false);
    }
}
