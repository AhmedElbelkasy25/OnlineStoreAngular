import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './categories/category/category.component';
import { AddCatgeoryComponent } from './categories/addCategory/addCategory.component';
import { CategoryDetailsComponent } from './categories/categoryDetails/categoryDetails.component';
import { EditCatgeoryComponent } from './categories/editCatgeory/editCatgeory.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { BrandComponent } from './brands/brand/brand.component';

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
        path: 'Details/:id',
        component: CategoryDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: EditCatgeoryComponent,
      },
    ],
  },
  {
    path: 'brand',
    children: [
      {
        path: '',
        component: BrandComponent,
      },
      {
        path: 'add',
        component: AddCatgeoryComponent,
      },
      {
        path: 'Details/:id',
        component: CategoryDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: EditCatgeoryComponent,
      },
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
