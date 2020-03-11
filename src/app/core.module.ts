import { NgModule } from '@angular/core';
import { DoctorService } from './components/doctors/doctor.service';
import { ImageService } from './components/images/image.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerInterceptor } from './shared/loading-spinner/loading-spinner.interceptor';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { UtilitiesService } from './shared/utilities.service';
import { DepartmentService } from './components/departments/department.service';
import { CalendarService } from './components/appointments/appointment-manager/calendar/calendar.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AppointmentService } from './components/appointments/appointment.service';
import { PatientService } from './components/patients/patient.service';
import { ServiceService } from './components/services/services.service';

@NgModule({
    providers: [
        DoctorService,
        DepartmentService,
        PatientService,
        ServiceService,
        ImageService,
        CalendarService,
        AppointmentService,
        UtilitiesService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
        { provide: DateAdapter, useClass: MomentDateAdapter },
        { 
            provide: MAT_DATE_FORMATS, useValue: {
                parse: {
                    dateInput: ['l', 'LL'],
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            } 
        },
    ],
})

export class CoreModule {}