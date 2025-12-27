import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/userService.service';
import { IUser } from '../../interfaces/user/Iuser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoItemsComponent } from '../../shared/components/noItems/noItems.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [FormsModule, NoItemsComponent, CommonModule],
})
export class UserComponent implements OnInit {
  isLoading: boolean = false;
  allUsers: IUser[] = [];
  constructor(private userService: UserServiceService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.allUsers = res.users;
        console.log('users', this.allUsers);
      },
      error: (err) => {
        this.isLoading = false;
        this.snack.open(err.error.msg, 'Close 🤷‍♂️', {
          duration: 4000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  blockUser(userId: string) {
    this.isLoading = true;
    this.userService.blockUser(userId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snack.open(res.msg, '', {
          duration: 4000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snack.open(err.error.msg, '', {
          duration: 4000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  unBlockUser(userId: string) {
    this.isLoading = true;
    this.userService.unblockUser(userId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snack.open(res.msg, '', {
          duration: 4000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snack.open(err.error.msg, '', {
          duration: 4000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
