import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                if(!user) {
                    return next.handle(request);
                }
                
                const modifiedRequest = request.clone({
                    setParams: {
                        token: user.token
                    }
                });

                return next.handle(modifiedRequest);
            })
        );
    }
}