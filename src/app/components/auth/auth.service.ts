import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { JWTAuthResponse } from 'src/app/interfaces/JWTAuthResponse.interface';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(
        private http: HttpClient
    ) {}

    login(email: string, password: string): Observable<JWTAuthResponse> {
        return this.http.post<JWTAuthResponse>('http://127.0.0.1:8001/api/login', {
            email: email,
            password: password
        }).pipe(
            tap(response => {
                this.handleAuthentication(response.access_token, response.expires_in);
            })
        );
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const user = new User(userData._token, new Date(userData._tokenExpirationDate));

        if(user.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.user.next(user);

            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    handleAuthentication(token: string, tokenExpiresIn: number) {
        const tokenExpirationDate = new Date(new Date().getTime() + tokenExpiresIn * 1000);
        const user = new User(token, tokenExpirationDate);

        localStorage.setItem('userData', JSON.stringify(user));
        
        this.user.next(user);

        this.autoLogout(tokenExpiresIn * 1000);
    }

    handleError(errorResponse: HttpErrorResponse) {
        return throwError('Error');
    }

    logout() {
        localStorage.removeItem('userData');
        
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        
        this.tokenExpirationTimer = null;
        
        return this.http.post('http://127.0.0.1:8001/api/logout', {}).pipe(
            catchError(this.handleError),
            tap((_) => {
                this.user.next(null);
            })
        );
    }
}
