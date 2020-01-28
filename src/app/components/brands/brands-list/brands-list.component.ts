import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.post('http://127.0.0.1:8000/api/brands', {
          name: 'KTM3'
      }).subscribe(
          response => {
              console.log(response);
          }
      )
  }

}