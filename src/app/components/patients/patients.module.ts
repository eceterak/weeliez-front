import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientListItemComponent } from './patient-list/patient-list-item/patient-list-item.component';
import { PatientDialogComponent } from './patient-dialog/patient-dialog.component';

@NgModule({
    declarations: [
        PatientListComponent,
        PatientListItemComponent,
        PatientDialogComponent
    ],
    imports: [
        SharedModule,
        PatientRoutingModule
    ],
    entryComponents: [ PatientDialogComponent ]
})

export class PatientsModule {}