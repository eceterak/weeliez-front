import { NgModule } from '@angular/core';
import { DoctorListItemComponent } from './doctor-list/doctor-list-item/doctor-list-item.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorRoutingModule } from './doctor-routing.module';

@NgModule({
    declarations: [
        DoctorListItemComponent,
        DoctorListComponent,
        DoctorComponent,
    ],
    imports: [
        SharedModule,
        DoctorRoutingModule
    ]
})

export class DoctorsModule {}