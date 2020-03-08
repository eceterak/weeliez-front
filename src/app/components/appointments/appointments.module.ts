import { NgModule } from '@angular/core';
import { RotaComponent } from './rota/rota.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { CalendarComponent } from './rota/calendar/calendar.component';
import { CalendarDayComponent } from './rota/calendar/calendar-day/calendar-day.component';
import { CalendarMonthPickerComponent } from './rota/calendar-month-picker/calendar-month-picker.component';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';

@NgModule({  
    declarations: [
        RotaComponent,
        CalendarMonthPickerComponent,
        CalendarComponent,
        CalendarDayComponent,
        AppointmentModalComponent
    ],
    imports: [
        SharedModule,
        AppointmentsRoutingModule
    ],
    entryComponents: [
        AppointmentModalComponent
    ]
})

export class AppointmentsModule {}