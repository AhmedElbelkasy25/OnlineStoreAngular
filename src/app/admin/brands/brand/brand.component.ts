import { Component, OnInit } from '@angular/core';
import { IBrand } from '../../../models/ibrand';
import { BrandServiceService } from '../../../services/brandService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  imports: [RouterLink, CommonModule],
})
export class BrandComponent implements OnInit {
  allBrands: IBrand[] = {} as IBrand[];

  constructor(private brandService: BrandServiceService, private snack: MatSnackBar) {
    // this.allBrands = [];
    debugger;
    this.brandService.getallBrands().subscribe({
      next: (brand) => {
        this.allBrands = brand.brands;
        debugger;
        // console.log(this.allBrands);
      },
      error: (err) => {
        console.log(err);
        debugger;
        this.snack.open(err.error.msg, 'Close 🤷‍♂️', {
          duration: 4000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        debugger;
      },
    });
    debugger;
  }
  ngOnInit(): void {}

  Delete(id: number) {
    this.brandService.deleteBrand(id).subscribe({
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
        this.allBrands = this.allBrands.filter((brand) => brand.id !== id);
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
      text: 'You will not be able to recover this brand!',
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
