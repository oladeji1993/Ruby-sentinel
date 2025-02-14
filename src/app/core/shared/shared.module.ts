import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContentComponent } from './card-content/card-content.component';
import { TableLoaderComponent } from './table-loader/table-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';




@NgModule({
  declarations: [
    CardContentComponent,
    TableLoaderComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatProgressSpinnerModule

  ],
  exports: [
    CardContentComponent,
    TableLoaderComponent
  ]
})
export class SharedModule { }
