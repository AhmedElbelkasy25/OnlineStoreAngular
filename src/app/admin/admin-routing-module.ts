import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './categories/category/category.component';
import { AddCatgeoryComponent } from './categories/addCategory/addCategory.component';
import { CategoryDetailsComponent } from './categories/categoryDetails/categoryDetails.component';
import { EditCatgeoryComponent } from './categories/editCatgeory/editCatgeory.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { BrandComponent } from './brands/brand/brand.component';
import { AddBrandComponent } from './brands/AddBrand/AddBrand.component';
import { BrandDetailsComponent } from './brands/BrandDetails/BrandDetails.component';
import { EditBrandComponent } from './brands/editBrand/editBrand.component';
import { ProductComponent } from './products/product/product.component';
import { AddProductComponent } from './products/addProduct/addProduct.component';
import { ProductDetailsComponent } from './products/productDetails/productDetails.component';
import { EditProductComponent } from './products/editProduct/editProduct.component';

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
        component: AddBrandComponent,
      },
      {
        path: 'Details/:id',
        component: BrandDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: EditBrandComponent,
      },
    ],
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'add',
        component: AddProductComponent,
      },
      {
        path: 'Details/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: EditProductComponent,
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
