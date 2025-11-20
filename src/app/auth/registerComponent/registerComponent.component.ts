import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { AuthServiceService } from '../../services/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerComponent',
  standalone: true,
  templateUrl: './registerComponent.component.html',
  styleUrls: ['./registerComponent.component.css'],
  imports: [FormsModule],
})
export class RegisterComponentComponent implements OnInit {
  user: User = {} as User;
  errMsg: string = '';
  errs: string[] = [];
  constructor(private authService: AuthServiceService, private router: Router) {
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
        alert(res.message);
        console.log(res.message);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log('there is errors');
        this.errMsg = err.error.message;
        this.errs = err.error.errors;
      },
    });
  }
  ngOnInit() {}
}
