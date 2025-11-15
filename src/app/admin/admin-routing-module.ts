import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./category/category.component').then((c) => c.CategoryComponent),
  // },
  {
    path: '',
    component: CategoryComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
