import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/icategory';
import { CategoryService } from '../../services/category-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [JsonPipe],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  allCategories: ICategory[];

  constructor(private catService: CategoryService) {
    this.allCategories = [];
  }
  ngOnInit(): void {
    this.catService.getallCategory().subscribe({
      next: (cat) => {
        this.allCategories = cat.categories;
        console.log(this.allCategories);
      },
      error: (err) => console.log(err),
    });
  }
}
