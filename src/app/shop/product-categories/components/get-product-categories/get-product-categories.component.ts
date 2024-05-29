import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  GetProductCategoriesDataSource,
  GetProductCategoriesItem,
} from './get-product-categories-datasource';

@Component({
  selector: 'metavision-get-product-categories',
  templateUrl: './get-product-categories.component.html',
  styleUrl: './get-product-categories.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule],
})
export class GetProductCategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GetProductCategoriesItem>;
  dataSource = new GetProductCategoriesDataSource();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onAddNew(): void {
    this.router.navigate(['new'], {
      relativeTo: this.activatedRoute,
    });
  }
}
