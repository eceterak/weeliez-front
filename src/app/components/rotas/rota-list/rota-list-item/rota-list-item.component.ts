import { Component, Input, OnInit } from '@angular/core';
import { Rota } from 'src/app/models/rota.model';
import { RotaService } from '../../rota.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: '[app-rota-list-item]',
  templateUrl: './rota-list-item.component.html',
  styleUrls: ['./rota-list-item.component.scss']
})
export class RotaListItemComponent implements OnInit {

    @Input() rota: Rota;

    constructor(
        private rotaService: RotaService, 
        private alertService: AlertService
    ) {}

    ngOnInit() {
        console.log(this.rota);
    }

    onDeleteDoctor() {
        // this.rotaService.delet(this.doctor.id).subscribe(
        //     (_) => {
        //         this.alertService.alert.next({
        //             messages: 'Doctor deleted',
        //             class: 'success'
        //         });
        //     },
        //     (errorResponse: HttpErrorResponse) => {
        //         console.log(errorResponse);
        //     }
        // );
    }

}
