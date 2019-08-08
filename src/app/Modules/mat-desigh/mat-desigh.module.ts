import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSnackBarModule, MatSortModule, MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule, MatButtonModule,
    MatFormFieldModule, MatSnackBarModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatCheckboxModule,
  ]
})
export class MatDesighModule { }
