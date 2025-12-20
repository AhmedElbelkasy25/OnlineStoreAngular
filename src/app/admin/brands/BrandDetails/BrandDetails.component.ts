import { Component, OnInit } from '@angular/core';
import { IBrand } from '../../../models/ibrand';
import { BrandServiceService } from '../../../services/brandService.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-BrandDetails',
  templateUrl: './BrandDetails.component.html',
  styleUrls: ['./BrandDetails.component.css'],
  imports: [CommonModule, RouterLink],
})
export class BrandDetailsComponent implements OnInit {
  currentId: number = 0;
  brand: IBrand = {} as IBrand;
  constructor(private activeRoute: ActivatedRoute, private brandService: BrandServiceService) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    });
    this.brandService.getBrandById(this.currentId)?.subscribe({
      next: (res) => {
        this.brand = res.brand;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        alert(err);
      },
    });
  }
}
