import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBrand } from '../../../models/ibrand';
import { BrandServiceService } from '../../../services/brandService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editBrand',
  templateUrl: './editBrand.component.html',
  styleUrls: ['./editBrand.component.css'],
  imports: [FormsModule],
})
export class EditBrandComponent implements OnInit {
  brandId: number = 0;
  submitted: boolean = false;
  brand: IBrand | null = null;
  msgErr: string = '';
  constructor(
    private brandService: BrandServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.brandId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    });
    this.brandService.getBrandById(this.brandId).subscribe({
      next: (brand) => {
        this.brand = brand.brand;
      },
      error: (err) => (this.msgErr = err.error.msgErr),
    });
  }

  submitForm() {
    this.submitted = !this.submitted;
  }

  editbrand() {
    this.brandService.editBrand(this.brand!).subscribe({
      next: (res) => {
        // alert(res.msg);
        this.snack.open(res.msg, 'Close', {
          duration: 5000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate([`admin/brand/Details/${this.brandId}`]);
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
