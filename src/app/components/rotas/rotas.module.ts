import { NgModule } from '@angular/core';
import { RotaComponent } from './rota/rota.component';
import { RotasListComponent } from './rotas-list/rotas-list.component';
import { RotasListItemComponent } from './rotas-list/rotas-list-item/rotas-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RotasRoutingModule } from './rotas-routing.module';
import { CalendarComponent } from './rota/calendar/calendar.component';
import { CalendarDayComponent } from './rota/calendar/calendar-day/calendar-day.component';

@NgModule({  
    declarations: [
        RotaComponent,
        RotasListComponent,
        RotasListItemComponent,
        CalendarComponent,
        CalendarDayComponent
    ],
    imports: [
        SharedModule,
        RotasRoutingModule
    ]
})

export class RotasModule {}