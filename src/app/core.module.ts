import { NgModule } from '@angular/core';
import { EmployeeService } from './components/employees/employee.service';
import { ImageService } from './components/images/image.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerInterceptor } from './shared/loading-spinner/loading-spinner.interceptor';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { UtilitiesService } from './shared/utilities.service';
import { DepartmentService } from './components/departments/department.service';
import { RotaService } from './components/rotas/rota.service';

@NgModule({
    providers: [
        EmployeeService,
        ImageService,
        DepartmentService,
        RotaService,
        UtilitiesService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
})

export class CoreModule {}