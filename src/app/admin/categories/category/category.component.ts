import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/icategory';
import { CategoryService } from '../../../services/category-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoItemsComponent } from '../../../shared/components/noItems/noItems.component';
@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [RouterLink, CommonModule, NoItemsComponent],
})
export class CategoryComponent implements OnInit {
  allCategories: ICategory[] = [];
  isLoading: boolean = false;

  constructor(private catService: CategoryService, private snack: MatSnackBar) {
    // this.allCategories = [];
    this.isLoading = true;
    this.catService.getallCategory().subscribe({
      next: (cat) => {
        this.isLoading = false;
        this.allCategories = cat.categories;

        // console.log(this.allCategories);
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
  ngOnInit(): void {}

  Delete(id: number) {
    this.catService.deleteCategory(id).subscribe({
      next: (res) => {
        // alert(res.msg);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: res.msg,
          timer: 3000,
          showConfirmButton: false,
        });
        this.snack.open(res.msg, 'Close ✔', {
          duration: 4000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.allCategories = this.allCategories.filter((cat) => cat.id !== id);
      },
      error: (err) => {
        this.snack.open(err.error.msg, 'Close 🤷‍♂️', {
          duration: 4000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  ConfirmDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((res) => {
      if (res.isConfirmed) {
        this.Delete(id);
      }
    });
  }
}
