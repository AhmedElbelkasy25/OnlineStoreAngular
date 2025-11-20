import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../../models/icategory';

import { CategoryService } from '../../../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addCatgeory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addCategory.component.html',
  styleUrls: ['./addCategory.component.css'],
})
export class AddCatgeoryComponent implements OnInit {
  newCategory: ICategory;
  submitted: boolean;
  constructor(private catService: CategoryService, private router: Router) {
    this.newCategory = {
      id: 0,
      name: '',
      description: '',
      status: true,
    };
    this.submitted = false;
  }

  submitForm() {
    this.submitted ? (this.submitted = false) : (this.submitted = true);
  }

  addCatgeory() {
    console.log('Sending:', this.newCategory);

    this.catService.addCatgeory(this.newCategory).subscribe({
      next: (response) => {
        console.log('Success:', response);
        alert('Category added successfully!');
        this.router.navigate(['/admin/category']);
      },
      error: (err) => {
        console.error('Error details:', err);
        alert('Failed to add category: ' + err.message);
      },
    });
  }

  ngOnInit() {}
}
