import { Component, Input } from '@angular/core';
import { PagerInterface } from 'src/app/interfaces/pager.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    @Input() pager: PagerInterface;
}