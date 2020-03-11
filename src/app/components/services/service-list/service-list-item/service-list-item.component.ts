import { Component, Input } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ServiceService } from '../../services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceDialogComponent } from '../../service-dialog/service-dialog.component';

@Component({
    selector: '[app-service-list-item]',
    templateUrl: './service-list-item.component.html',
    styleUrls: ['./service-list-item.component.scss']
})
export class ServiceListItemComponent {

    @Input() service: Service;

    constructor(
        private serviceService: ServiceService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    onDeleteService() {
        this.serviceService.deleteService(this.service.id).subscribe(
            (_) => {
                this.snackBar.open('Service deleted', '', {
                    horizontalPosition: 'right'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

    onEditService() {
        this.dialog.open(ServiceDialogComponent, {
            width: '800px',
            data: this.service.id,
            position: { 
                top: '50px' 
            }
        });
    }

}
