import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrandServiceService } from '../../../services/brandService.service';
import { IBrand } from '../../../models/ibrand';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-AddBrand',
  templateUrl: './AddBrand.component.html',
  styleUrls: ['./AddBrand.component.css'],
  imports: [FormsModule],
})
export class AddBrandComponent implements OnInit {
  newBrand: IBrand;
  submitted: boolean;
  constructor(
    private brandService: BrandServiceService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.newBrand = {
      id: 0,
      name: '',
      description: '',
      status: true,
    };
    this.submitted = false;
  }

  submitForm() {
    this.submitted ? (this.submitted = false) : (this.submitted = true);
  }

  addBrand() {
    // console.log('Sending:', this.newBrand);

    this.brandService.addBrand(this.newBrand).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.snack.open('brand Added successfully', 'Close', {
          duration: 5000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/admin/brand']);
      },
      error: (err) => {
        console.error('Error details:', err);

        if (err?.error?.errors?.Name) {
          err.error.errors.Name.forEach((message: string) => {
            this.snack.open(`Failed to add brand: ${message}`, 'Close', {
              duration: 5000,
              panelClass: ['snack-error'],
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          });
        } else {
          this.snack.open('Failed to add brand.', 'Close', {
            duration: 5000,
            panelClass: ['snack-error'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      },
    });
  }

  ngOnInit() {}
}
