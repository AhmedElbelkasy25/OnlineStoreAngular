import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { ProductServiceService } from '../../../services/productService.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProductDetails } from '../../../interfaces/products/IProductDetails';
import { EnvUrlPipePipe } from '../../../pips/EnvUrlPipe.pipe';
import { NotFoundComponent } from '../../NotFound/NotFound.component';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css'],
  imports: [EnvUrlPipePipe, NotFoundComponent, RouterLink],
})
export class ProductDetailsComponent implements OnInit {
  prod: IProductDetails = {} as IProductDetails;
  currentId: number = 0;
  isLoading: boolean = false;
  notFound: boolean = false;
  constructor(private prodService: ProductServiceService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    });
    this.getProduct();
    console.log('prrr', this.prod);
    debugger;
  }

  getProduct() {
    this.prodService.getProductById(this.currentId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.notFound = false;
        this.prod = res.product;
      },
      error: (err) => {
        this.isLoading = false;
        this.notFound = true;
        console.log('error', err.error.msg);
      },
    });
  }
}
