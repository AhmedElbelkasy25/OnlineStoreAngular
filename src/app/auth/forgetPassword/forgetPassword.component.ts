import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/authService.service';
import { JsonPipe } from '@angular/common';
import { IForgetPassword } from '../../interfaces/auth/iforget-password';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css'],
  imports: [FormsModule],
})
export class ForgetPasswordComponent implements OnInit {
  msg: string = '';
  errs: string[] = [];
  forgetPass: IForgetPassword;
  constructor(private router: Router, private authService: AuthServiceService) {
    this.forgetPass = { EmailOrUserName: '' };
  }

  forgetPassword() {
    this.authService.forgetPassword(this.forgetPass).subscribe({
      next: (res) => {
        this.msg = 'check your Email';
        console.log(res);
      },
      error: (err) => {
        this.msg = err.error.message;
        this.errs = err.error.errors;
        console.log(err);
      },
    });
  }

  ngOnInit() {}
}
