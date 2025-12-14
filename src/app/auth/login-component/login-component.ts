import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IloginRequest } from '../../interfaces/auth/IloginRequest';
import { AuthServiceService } from '../../services/authService.service';
import { Router, RouterLink } from '@angular/router';
import { IExternalLogin } from '../../interfaces/auth/IExternalLogin';

import {
  SocialAuthService,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialUser,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule, RouterLink, GoogleSigninButtonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  login: IloginRequest;
  errMsg: string = '';
  errs: string[] = [];
  socialUser!: SocialUser;

  constructor(
    private MyAuthService: AuthServiceService,
    private router: Router,
    private auth: SocialAuthService,
    private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) {
    this.login = {
      account: '',
      password: '',
      rememberMe: false,
    };
  }

  ngOnInit() {
    debugger;
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.socialUser = user;
        console.log('User signed in:', user);

        let token = '';
        if (user.provider === 'GOOGLE') {
          token = user.idToken ?? ''; // Google uses idToken
        } else if (user.provider === 'FACEBOOK') {
          token = user.authToken ?? ''; // Facebook uses authToken (access token)
        }
        const payload: IExternalLogin = {
          provider: user.provider ?? '',
          idToken: token ?? '',
        };
        debugger;
        this.http.post(`${environment.apiBaseUrl}/Accounts/ExternalLogin`, payload).subscribe({
          next: (res: any) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
            console.log('Login successful!');
            this.router.navigate(['/user']);
          },
          error: (err) => {
            console.error('External login failed', err);
            this.errMsg = `${payload.provider} login failed. Please try again.`;
          },
        });
      }
    });
  }

  loginMethod() {
    debugger;
    this.MyAuthService.login(this.login).subscribe({
      next: (res) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate(['user']);
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.errs = err.error.errors;
      },
    });
    debugger;
  }

  // Optional: Manual Google sign-in method
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // sign in with facebook

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  // Optional: Sign out method
  signOut(): void {
    this.socialAuthService.signOut();
  }
}
