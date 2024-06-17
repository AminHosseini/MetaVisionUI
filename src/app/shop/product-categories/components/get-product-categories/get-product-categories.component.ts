import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  signal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductCategoryService } from '../../services/product-category.service';
import { FontHelperDirective } from '../../../../shared/directives/font-helper.directive';
import { ProductCategoriesGroupModel } from '../../models/product-categories-group.model';
import { ButtonHelperDirective } from '../../../../shared/directives/button-helper.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoriesFilterModel } from '../../models/product-categories.filter.model';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../../../shared/services/alert.service';
import { IdRowVersionModel } from '../../../../shared/models/id-rowversion.model';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { ProductCategoriesModel } from '../../models/product-categories.model';

@Component({
  selector: 'shop-get-product-categories',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FontHelperDirective,
    ButtonHelperDirective,
  ],
  templateUrl: './get-product-categories.component.html',
  styleUrl: './get-product-categories.component.css',
})
export class GetProductCategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input', { static: false }) searchInput!: ElementRef;
  selectOptions = signal<ProductCategoriesGroupModel[]>([]);
  private data = signal<ProductCategoriesFilterModel[]>(
    this.productCategoryService.getProductCategories()
  );
  dataSource = new MatTableDataSource(this.data());

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fillParentIdSelect();
  }

  columns = [
    {
      columnDef: 'parentName',
      header: 'دسته بندی اصلی',
      cell: (productCategory: ProductCategoriesFilterModel) =>
        `${productCategory.parentName}`,
    },
    {
      columnDef: 'name',
      header: 'نام',
      cell: (productCategory: ProductCategoriesFilterModel) =>
        `${productCategory.name}`,
    },
    {
      columnDef: 'isDeleted',
      header: 'وضعیت',
      cell: (productCategory: ProductCategoriesFilterModel) =>
        `${productCategory.isDeleted}`,
    },
    {
      columnDef: 'operations',
      header: 'عملیات ها',
      cell: (productCategory: ProductCategoriesFilterModel) =>
        `${productCategory.productCategoryId}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // showNameByParentId(parentId: number): string | undefined {
  //   if (+parentId === 0 || parentId === null) return '-';

  //   return this.data().find((productCategory) => {
  //     return productCategory.productCategoryId === +parentId;
  //   })?.name;
  // }

  getStatus(parentId: number): boolean | undefined {
    return this.data().find((productCategory) => {
      return productCategory.productCategoryId === +parentId;
    })?.isDeleted;
  }

  /**
   * پر کردن لیست و دراپ داون دسته بندی محصول اصلی
   */
  private fillParentIdSelect(): void {
    this.selectOptions.set(
      this.productCategoryService.getProductCategoriesGroup()
    );
  }

  onAddNew(): void {
    this.router.navigate(['new'], {
      relativeTo: this.activatedRoute,
    });
  }

  filterCategory(event: Event): void {
    if (+event === 0) {
      this.searchInput.nativeElement.value = null;
      this.dataSource = new MatTableDataSource(this.data());
    } else {
      const filteredData: ProductCategoriesFilterModel[] = this.data().filter(
        (productCategory) => {
          return +productCategory.parentId === +event;
        }
      );
      this.searchInput.nativeElement.value = null;
      this.dataSource = new MatTableDataSource(filteredData);
    }
  }

  getProductCategory(id: number): void {
    this.router.navigate([+id], {
      relativeTo: this.activatedRoute,
    });
  }

  async onDelete(id: number) {
    const result = await this.alertService.deleteAsync();
    if (result.isConfirmed) {
      const rowVersion: string =
        this.data().find((productCategory) => {
          return productCategory.productCategoryId === id;
        })?.rowVersion ?? '';

      const model = new IdRowVersionModel(id, rowVersion);
      this.productCategoryService.deleteProductCategory(model).subscribe({
        complete: () => {
          this.productCategoryService
            .fetchProductCategoriesWithoutSubscription()
            .subscribe({
              next: (productCategories: ProductCategoriesModel[]) => {
                const data: ProductCategoriesFilterModel[] = [];

                productCategories.forEach(
                  (productCategory: ProductCategoriesModel) => {
                    const parentName: string | undefined =
                      +productCategory.parentId === 0 ||
                      productCategory.parentId === null
                        ? '-'
                        : productCategories.find((pc) => {
                            return (
                              +pc.productCategoryId ===
                              +productCategory.parentId
                            );
                          })?.name;
                    data.push(
                      new ProductCategoriesFilterModel(
                        productCategory.productCategoryId,
                        productCategory.isDeleted,
                        productCategory.rowVersion,
                        productCategory.parentId,
                        parentName ?? '',
                        productCategory.name
                      )
                    );
                  }
                );

                this.data.set(data);
                this.dataSource = new MatTableDataSource(this.data());
              },
              error: (err) => {
                this.errorHandlerService.handleError(err);
              },
            });
          this.alertService.successAlert();
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
    } else {
      return;
    }
  }
}
