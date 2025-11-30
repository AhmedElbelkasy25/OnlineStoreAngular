import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { AuthServiceService } from '../../services/authService.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registerComponent',
  standalone: true,
  templateUrl: './registerComponent.component.html',
  styleUrls: ['./registerComponent.component.css'],
  imports: [FormsModule, RouterLink],
})
export class RegisterComponentComponent implements OnInit {
  user: User = {} as User;
  errMsg: string = '';
  errs: string[] = [];
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.user = {
      id: 0,
      userName: '',
      Name: '',
      Email: '',
      password: '',
      confirmPassword: '',
    };
  }
  register() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.snack.open(res.message, 'dismiss', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log('there is errors');
        this.snack.open('there is errors', 'dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.errMsg = err.error.message;
        this.errs = err.error.errors;
      },
    });
  }
  ngOnInit() {}
}
