import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    searchForm: FormGroup;
    valueChangesSubscription: Subscription;
    @Output() searchTermUpdate = new EventEmitter<Object>();

    ngOnInit() {
        this.searchForm = new FormGroup({
            name: new FormControl()
        });

        this.valueChangesSubscription = this.searchForm.valueChanges
            .pipe(
                debounceTime(500)
            )
            .subscribe(
                searchForm => {
                    this.searchTermUpdate.emit(searchForm);
                }
            );
    }

    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}