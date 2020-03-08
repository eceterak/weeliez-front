import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentService } from '../../departments/department.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

    appointmentForm: FormGroup;

    constructor(
        private modalRef: MatDialogRef<AppointmentModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private departmentService: DepartmentService,
        private appointmentService: AppointmentService
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.appointmentForm = new FormGroup({
            'patient': new FormControl(null, Validators.required),
            'service': new FormControl(null, Validators.required),
            'time': new FormControl(null, Validators.required)
        })
    }

    onFormSubmit() {
        console.log(this.appointmentForm.value);

        this.appointmentService.createAppointment(this.data.slot, this.data.date);
    }
}