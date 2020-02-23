import { NgModule } from '@angular/core';
import { BrandService } from './components/back/departments/brand.service';
import { ImageService } from './components/images/image.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerInterceptor } from './shared/loading-spinner/loading-spinner.interceptor';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { UtilitiesService } from './shared/utilities.service';

@NgModule({
    providers: [
        BrandService,
        ImageService,
        UtilitiesService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
})

export class CoreModule {}