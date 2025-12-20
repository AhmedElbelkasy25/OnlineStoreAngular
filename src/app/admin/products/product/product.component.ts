import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { ProductServiceService } from '../../../services/productService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NoItemsComponent } from '../../../shared/components/noItems/noItems.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [RouterLink, NoItemsComponent, MatProgressSpinnerModule],
})
export class ProductComponent implements OnInit {
  prods: IProduct[] = [];
  isLoading: boolean = false;
  constructor(private prodService: ProductServiceService, private snack: MatSnackBar) {
    this.prods = [];
  }

  ngOnInit() {
    this.isLoading = true;
    this.prodService.getAllProducts().subscribe({
      next: (res) => {
        this.prods = res.products;
        this.isLoading = false;
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

  ConfirmDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this brand!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((res) => {
      if (res.isConfirmed) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: number) {
    this.prodService.deleteProduct(id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: res.msg,
          timer: 3000,
          showConfirmButton: false,
        });
        this.prods = this.prods.filter((prd) => prd.id != id);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Not Deleted!',
          text: err.Error.msg,
          timer: 3000,
          showConfirmButton: false,
        });
      },
    });
  }
}
