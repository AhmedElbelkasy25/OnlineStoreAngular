import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './categories/category/category.component';
import { AddCatgeoryComponent } from './categories/addCategory/addCategory.component';
import { CategoryDetailsComponent } from './categories/categoryDetails/categoryDetails.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full',
  },
  {
    path: 'category',
    children: [
      {
        path: '', // /admin/category
        component: CategoryComponent,
      },
      {
        path: 'add', // /admin/category/add
        component: AddCatgeoryComponent,
      },
      {
        path: 'categoryDetails/:id',
        component: CategoryDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
