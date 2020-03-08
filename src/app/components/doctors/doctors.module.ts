import { NgModule } from '@angular/core';
import { DoctorListItemComponent } from './doctor-list/doctor-list-item/doctor-list-item.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDialogComponent } from './doctor-dialog/doctor-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorRoutingModule } from './doctor-routing.module';

@NgModule({
    declarations: [
        DoctorListItemComponent,
        DoctorListComponent,
        DoctorDialogComponent
    ],
    imports: [
        SharedModule,
        DoctorRoutingModule
    ],
    entryComponents: [ DoctorDialogComponent ]
})

export class DoctorsModule {}