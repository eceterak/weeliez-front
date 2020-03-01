import { NgModule } from '@angular/core';
import { RotaComponent } from './rota/rota.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RotasRoutingModule } from './rotas-routing.module';
import { CalendarComponent } from './rota/calendar/calendar.component';
import { CalendarDayComponent } from './rota/calendar/calendar-day/calendar-day.component';
import { RotaListComponent } from './rota-list/rota-list.component';
import { RotaListItemComponent } from './rota-list/rota-list-item/rota-list-item.component';
import { CalendarMonthPickerComponent } from './rota/calendar-month-picker/calendar-month-picker.component';

@NgModule({  
    declarations: [
        RotaComponent,
        RotaListComponent,
        RotaListItemComponent,
        CalendarMonthPickerComponent,
        CalendarComponent,
        CalendarDayComponent
    ],
    imports: [
        SharedModule,
        RotasRoutingModule
    ]
})

export class RotasModule {}