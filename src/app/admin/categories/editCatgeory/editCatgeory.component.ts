import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category-service.service';
import { ICategory } from '../../../models/icategory';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editCatgeory',
  templateUrl: './editCatgeory.component.html',
  styleUrls: ['./editCatgeory.component.css'],
  imports: [FormsModule, JsonPipe],
})
export class EditCatgeoryComponent implements OnInit {
  catId: number = 0;
  submitted: boolean = false;
  category: ICategory | null = null;
  msgErr: string = '';
  constructor(
    private catService: CategoryService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.catId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    });
    this.catService.getCategoryById(this.catId).subscribe({
      next: (cat) => {
        this.category = cat.category;
      },
      error: (err) => (this.msgErr = err.error.msgErr),
    });
  }

  submitForm() {
    this.submitted = !this.submitted;
  }

  editCategory() {
    this.catService.editCatgeory(this.category!).subscribe({
      next: (res) => {
        // alert(res.msg);
        this.snack.open(res.msg, 'Close', {
          duration: 5000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate([`admin/category/Details/${this.catId}`]);
      },
      error: (err) =>
        this.snack.open('failed ...', 'Close', {
          duration: 5000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }),
    });
  }
}
