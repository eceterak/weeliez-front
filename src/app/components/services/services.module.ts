import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceListItemComponent } from './service-list/service-list-item/service-list-item.component';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
@NgModule({
    declarations: [
        ServiceListComponent,
        ServiceListItemComponent,
        ServiceDialogComponent
    ],
    imports: [
        SharedModule,
        ServiceRoutingModule
    ],
    entryComponents: [ ServiceDialogComponent ]
})

export class ServicesModule {}