import { NgModule } from '@angular/core';
import { BrandListItemComponent } from './brand-list/brand-list-item/brand-list-item.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandComponent } from './brand/brand.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrandsRoutingModule } from './brands-routing.module';

@NgModule({
    declarations: [
        BrandListItemComponent,
        BrandListComponent,
        BrandComponent,
    ],
    imports: [
        SharedModule,
        BrandsRoutingModule
    ]
})

export class BrandsModule {}