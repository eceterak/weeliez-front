import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentService } from '../../departments/department.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

    constructor(
        private modalRef: MatDialogRef<AppointmentModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private departmentService: DepartmentService
    ) {}

    ngOnInit() {
        
    }
}