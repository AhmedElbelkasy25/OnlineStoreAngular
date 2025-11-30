import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IResetPassword } from '../../interfaces/auth/i-reset-password';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/authService.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetPasswordComponent',
  templateUrl: './resetPasswordComponent.component.html',
  styleUrls: ['./resetPasswordComponent.component.css'],
  imports: [FormsModule],
})
export class ResetPasswordComponentComponent implements OnInit {
  resetPass: IResetPassword;
  userid: string;
  token: string;
  errMsg: string = '';
  errs: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.userid = this.activatedRoute.snapshot.queryParamMap.get('userId') || '';
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';
    this.resetPass = {
      userId: this.userid,
      token: this.token,
      password: '',
      confirmPassword: '',
    };
  }

  resetPassword() {
    this.authService.resetPassword(this.resetPass).subscribe({
      next: (res) => {
        this.snack.open('the password has been reset successfully', 'close', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['auth/login']);
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.errs = err.error.errors;
        this.snack.open(this.errMsg, 'close', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  ngOnInit() {}
}
