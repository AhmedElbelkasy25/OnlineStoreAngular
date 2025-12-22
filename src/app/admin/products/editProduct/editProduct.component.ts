import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { ProductServiceService } from '../../../services/productService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from '../../../models/icategory';
import { IBrand } from '../../../models/ibrand';
import { IProductDetails } from '../../../interfaces/products/IProductDetails';
import { CategoryService } from '../../../services/category-service.service';
import { BrandServiceService } from '../../../services/brandService.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { EnvUrlPipePipe } from '../../../pips/EnvUrlPipe.pipe';

@Component({
  selector: 'app-editProduct',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css'],
  imports: [FormsModule, JsonPipe, EnvUrlPipePipe],
})
export class EditProductComponent implements OnInit {
  prod: IProductDetails = {} as IProductDetails;
  currentId: number = 0;
  allCats!: ICategory[];
  allBrands!: IBrand[];
  cat: number = 0;
  brand: number = 0;
  submitted: boolean = false;
  mainImg?: File;
  imagePreview: string | null = null;
  constructor(
    private prodService: ProductServiceService,
    private catService: CategoryService,
    private brandService: BrandServiceService,
    private ActivatedRoute: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(this.ActivatedRoute.snapshot.paramMap.get('id'));
    });
    this.getAllCategories();
    this.getAllBrands();
    this.getProductById();
  }

  getProductById() {
    this.prodService.getProductById(this.currentId).subscribe({
      next: (res) => {
        this.prod = res.product;
      },
      error: (err) => {
        this.snack.open("sorry... can't get the product ", 'Close', {
          duration: 5000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  getAllCategories() {
    this.catService.getallCategory().subscribe({
      next: (res) => (this.allCats = res.categories),
    });
  }

  getAllBrands() {
    this.brandService.getallBrands().subscribe({
      next: (res) => (this.allBrands = res.brands),
    });
  }

  submitForm() {
    this.submitted = !this.submitted;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.mainImg = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.mainImg);
    }
  }

  editProduct() {
    const formData = new FormData();
    formData.append('id', this.prod.id.toString());
    formData.append('name', this.prod.name);
    formData.append('description', this.prod.description);
    formData.append('price', this.prod.price.toString());
    formData.append('quantity', this.prod.quantity.toString());
    formData.append('discount', this.prod.discount.toString());
    formData.append('status', this.prod.status.toString());
    formData.append('CategoryId', this.prod.categoryId.toString());
    formData.append('BrandId', this.prod.brandId.toString());
    if (this.mainImg) {
      formData.append('Image', this.mainImg!);
    }

    this.prodService.editProduct(formData).subscribe({
      next: (res) => {
        this.snack.open(res.msg, 'Close', {
          duration: 5000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate([`admin/product/Details/${this.currentId}`]);
      },
      error: (err) => {
        this.snack.open(err.error.msg, 'Close', {
          duration: 5000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
