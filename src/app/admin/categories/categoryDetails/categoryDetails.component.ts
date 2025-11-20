import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category-service';
import { ICategory } from '../../../models/icategory';

@Component({
  selector: 'app-categoryDetails',
  templateUrl: './categoryDetails.component.html',
  styleUrls: ['./categoryDetails.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  currentId: number = 0;
  category: ICategory = {} as ICategory;
  constructor(private activeRoute: ActivatedRoute, private catService: CategoryService) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.catService.getCategoryById(this.currentId)?.subscribe({
        next: (res) => {
          this.category = res.category;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          alert(err);
        },
      });
    });
  }
}
