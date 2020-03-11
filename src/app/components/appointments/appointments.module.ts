import { NgModule } from '@angular/core';
import { AppointmentManagerComponent } from './appointment-manager/appointment-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { CalendarComponent } from './appointment-manager/calendar/calendar.component';
import { CalendarMonthPickerComponent } from './appointment-manager/calendar-month-picker/calendar-month-picker.component';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';

@NgModule({  
    declarations: [
        AppointmentManagerComponent,
        CalendarMonthPickerComponent,
        CalendarComponent,
        AppointmentDialogComponent
    ],
    imports: [
        SharedModule,
        AppointmentsRoutingModule
    ],
    entryComponents: [ AppointmentDialogComponent ]
})

export class AppointmentsModule {}