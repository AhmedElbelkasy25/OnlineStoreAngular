import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';
import { IRegisterResponse } from '../interfaces/auth/IRegisterResponse';
import { environment } from '../../environments/environment.development';
import { IloginRequest } from '../interfaces/auth/IloginRequest';
import { ILoginResponse } from '../interfaces/auth/IloginResponse';
import { IResetPassword } from '../interfaces/auth/i-reset-password';
import { IForgetPassword } from '../interfaces/auth/iforget-password';
import { IRefreshTokenResponse } from '../interfaces/auth/IRefreshTokenResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = environment.apiBaseUrl;
  tokenExpired$: Subject<boolean> = new Subject<boolean>();
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {
    this.tokenExpired$.subscribe((res: boolean) => {
      if (res) {
        this.RefreshToken();
      }
    });
  }

  register(user: User): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(`${this.baseUrl}/accounts/register`, user, {
      headers: this.header,
    });
  }

  login(log: IloginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.baseUrl}/accounts/login`, log, {
      headers: this.header,
    });
  }

  resetPassword(reset: IResetPassword): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/accounts/Reset Password`, reset, {
      headers: this.header,
    });
  }

  forgetPassword(forget: IForgetPassword): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/Accounts/Forget Password`, forget, {
      headers: this.header,
    });
  }

  RefreshToken(): Observable<IRefreshTokenResponse> {
    const refresh = {
      accessToken: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
    return this.httpClient.post<IRefreshTokenResponse>(
      `${this.baseUrl}/Accounts/RefreshToken`,
      refresh,
      {
        headers: this.header,
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
