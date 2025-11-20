import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IloginRequest } from '../../interfaces/auth/IloginRequest';
import { AuthServiceService } from '../../services/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  login: IloginRequest;
  errMsg: string = '';
  errs: string[] = [];
  constructor(private authService: AuthServiceService, private router: Router) {
    this.login = {
      account: '',
      password: '',
      rememberMe: false,
    };
  }

  loginMethod() {
    this.authService.login(this.login).subscribe({
      next: (res) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this.router.navigate(['user']);
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.errs = err.error.errors;
      },
    });
  }
}
