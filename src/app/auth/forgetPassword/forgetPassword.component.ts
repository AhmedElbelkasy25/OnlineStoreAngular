import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/authService.service';
import { JsonPipe } from '@angular/common';
import { IForgetPassword } from '../../interfaces/auth/iforget-password';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css'],
  imports: [FormsModule, RouterLink],
})
export class ForgetPasswordComponent implements OnInit {
  msg: string = '';
  errs: string[] = [];
  forgetPass: IForgetPassword;
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private snack: MatSnackBar
  ) {
    this.forgetPass = { EmailOrUserName: '' };
  }

  forgetPassword() {
    this.authService.forgetPassword(this.forgetPass).subscribe({
      next: (res) => {
        this.msg = 'check your Email';
        this.snack.open(this.msg, 'dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (err) => {
        this.msg = err.error.message;
        this.snack.open(this.msg, 'dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.errs = err.error.errors;
        console.log(err);
      },
    });
  }

  ngOnInit() {}
}
