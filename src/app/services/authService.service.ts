import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { IRegisterResponse } from '../interfaces/auth/IRegisterResponse';
import { environment } from '../../environments/environment.development';
import { IloginRequest } from '../interfaces/auth/IloginRequest';
import { ILoginResponse } from '../interfaces/auth/IloginResponse';
import { IResetPassword } from '../interfaces/auth/i-reset-password';
import { IForgetPassword } from '../interfaces/auth/iforget-password';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient) {}
  register(user: User): Observable<IRegisterResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<IRegisterResponse>(
      `${environment.apiBaseUrl}/accounts/register`,
      user,
      { headers }
    );
  }

  login(log: IloginRequest): Observable<ILoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<ILoginResponse>(`${environment.apiBaseUrl}/accounts/login`, log, {
      headers,
    });
  }

  resetPassword(reset: IResetPassword): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<string>(
      `${environment.apiBaseUrl}/accounts/Reset Password`,
      reset,
      { headers }
    );
  }

  forgetPassword(forget: IForgetPassword): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<string>(
      `${environment.apiBaseUrl}/Accounts/Forget Password`,
      forget,
      { headers }
    );
  }
}
