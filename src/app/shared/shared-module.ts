import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoItemsComponent } from './components/noItems/noItems.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, NoItemsComponent],
  exports: [NoItemsComponent],
})
export class SharedModule {}
