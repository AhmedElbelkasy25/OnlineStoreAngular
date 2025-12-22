import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/productService.service';
import { IProduct } from '../../../models/iproduct';
import { cibNextJs } from '@coreui/icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../../models/icategory';
import { IBrand } from '../../../models/ibrand';
import { CategoryService } from '../../../services/category-service.service';
import { BrandServiceService } from '../../../services/brandService.service';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css'],
  imports: [FormsModule],
})
export class AddProductComponent implements OnInit {
  prod!: IProduct;
  submitted: boolean;
  mainImg!: File;
  allCats: ICategory[] = [];
  allBrands: IBrand[] = [];
  cat: number = 0;
  brand: number = 0;
  errs: string[] = [];

  constructor(
    private prodService: ProductServiceService,
    private snack: MatSnackBar,
    private router: Router,
    private catService: CategoryService,
    private brandService: BrandServiceService
  ) {
    (this.prod = {
      id: 0,
      name: '',
      description: '',
      discount: 0,
      mainImg: '',
      price: 0,
      quantity: 0,
      rate: 0,
      status: true,
      traffic: 0,
    }),
      (this.submitted = false);
  }

  ngOnInit() {
    this.getAllBrands();
    this.getAllCategories();
  }

  getAllCategories() {
    this.catService.getallCategory().subscribe({
      next: (res) => {
        this.allCats = res.categories;
        if (this.allCats.length > 0) {
          this.cat = this.allCats[0].id;
        }
      },
    });
  }

  getAllBrands() {
    this.brandService.getallBrands().subscribe({
      next: (res) => {
        this.allBrands = res.brands;
        if (this.allBrands.length > 0) {
          this.brand = this.allBrands[0].id;
        }
      },
    });
  }

  submitForm() {
    this.submitted = !this.submitted;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.mainImg = input.files[0];
    }
  }

  addProduct() {
    const formData = new FormData();
    formData.append('name', this.prod.name);
    formData.append('description', this.prod.description);
    formData.append('price', this.prod.price.toString());
    formData.append('quantity', this.prod.quantity.toString());
    formData.append('discount', this.prod.discount.toString());
    formData.append('status', this.prod.status.toString());
    formData.append('CategoryId', this.cat.toString());
    formData.append('BrandId', this.brand.toString());
    formData.append('Image', this.mainImg);

    this.prodService.addProduct(formData).subscribe({
      next: (res) => {
        this.snack.open('product Added successfully', 'Close', {
          duration: 5000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/admin/product']);
      },
      error: (err) => {
        this.errs = [];
        for (const key in err.error.errors) {
          this.errs.push(...err.error.errors[key]);
        }
        {
          this.snack.open('Failed to add product.', 'Close', {
            duration: 5000,
            panelClass: ['snack-error'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      },
    });
  }
}
