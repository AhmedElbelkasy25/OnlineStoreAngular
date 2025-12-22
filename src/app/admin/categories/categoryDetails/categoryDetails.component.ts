import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category-service.service';
import { ICategory } from '../../../models/icategory';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../NotFound/NotFound.component';

@Component({
  selector: 'app-categoryDetails',
  templateUrl: './categoryDetails.component.html',
  styleUrls: ['./categoryDetails.component.css'],
  imports: [CommonModule, RouterLink, NotFoundComponent],
})
export class CategoryDetailsComponent implements OnInit {
  currentId: number = 0;
  category: ICategory = {} as ICategory;
  notFound: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private catService: CategoryService) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    });
    this.catService.getCategoryById(this.currentId)?.subscribe({
      next: (res) => {
        this.notFound = false;
        this.category = res.category;
        console.log(res);
      },
      error: (err) => {
        this.notFound = true;
      },
    });
  }
}
