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
import { TableHeaderDirective } from '../../../../shared/directives/table-header.directive';
import { TableHeaderButtonDirective } from '../../../../shared/directives/table-header-button.directive';
import { TableColumnHeaderDirective } from '../../../../shared/directives/table-column-header.directive';
import { TableColumnValueDirective } from '../../../../shared/directives/table-column-value.directive';
import { OperationButtonDirective } from '../../../../shared/directives/operation-button.directive';
import { OperationButtonIconDirective } from '../../../../shared/directives/operation-button-icon.directive';

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
    TableHeaderDirective,
    TableHeaderButtonDirective,
    TableColumnHeaderDirective,
    TableColumnValueDirective,
    OperationButtonDirective,
    OperationButtonIconDirective,
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
    this.productCategoryService.getProductCategories(),
  );
  dataSource = new MatTableDataSource(this.data());

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private errorHandlerService: ErrorHandlerService,
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
        `${productCategory.productCategoryId}`,
    },
    {
      columnDef: 'operations',
      header: 'عملیات ها',
      cell: (productCategory: ProductCategoriesFilterModel) =>
        `${productCategory.productCategoryId}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  /**
   * جستوجو بر اساس متن وارد شده توسط کاربر
   * @param event متن وارد شده توسط کاربر
   */
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

  /**
   * گرفتن وضعیت حذف شده یا نشده بودن رکورد
   * @param productCategoryId آیدی دسته بندی محصول
   * @returns وضعیت حذف شده یا نشده بودن رکورد
   */
  getStatus(productCategoryId: number): boolean | undefined {
    return this.data().find((productCategory) => {
      return productCategory.productCategoryId === +productCategoryId;
    })?.isDeleted;
  }

  /**
   * پر کردن لیست و دراپ داون دسته بندی محصول اصلی
   */
  private fillParentIdSelect(): void {
    this.selectOptions.set(
      this.productCategoryService.getProductCategoriesGroup(),
    );
  }

  /**
   * رفتن به صفحه اضافه کردن دسته بندی محصول جدید
   */
  onAddNew(): void {
    this.router.navigate(['new'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * فیلتر کردن بر اساس دسته بندیه های محصول
   * @param event دسته بندی محصول اصلی انتخاب شده توسط کاربر
   */
  filterCategory(event: Event): void {
    if (+event === 0) {
      this.searchInput.nativeElement.value = null;
      this.dataSource = new MatTableDataSource(this.data());
    } else {
      const filteredData: ProductCategoriesFilterModel[] = this.data().filter(
        (productCategory) => {
          return +productCategory.parentId === +event;
        },
      );
      this.searchInput.nativeElement.value = null;
      this.dataSource = new MatTableDataSource(filteredData);
    }
  }

  /**
   * رفتن به صفحه دسته بندی محصول با آیدی دسته بندی محصول
   * @param id آیدی دسته بندی محصول
   */
  getProductCategory(id: number): void {
    this.router.navigate([+id], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * رفتن به صفحه مدیریت عکس های دسته بندی محصول
   * @param id آیدی دسته بندی محصول
   */
  getProductCategoryPictures(id: number): void {
    this.router.navigate([+id, 'pictures'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * پاک کردن رکورد
   * @param id آیدی دسته بندی محصول
   * @returns
   */
  async onDelete(id: number): Promise<void> {
    // ارسال پیام آیا از حذف اطمینان دارید؟
    const result = await this.alertService.deleteAsync();
    if (!result.isConfirmed) {
      return;
    }
    // ارسال پیام آیا از حذف اطمینان دارید؟

    // ساخت مدل برای ارسال درخواست حذف
    const rowVersion: string = this.getRowversion(id);
    const model = new IdRowVersionModel(id, rowVersion);
    // ساخت مدل برای ارسال درخواست حذف

    // شروع فرآیند حذف
    this.productCategoryService.deleteProductCategory(model).subscribe({
      // انجام عملیات در صورت موفق بودن فرآیند حذف
      complete: () => {
        this.getProductCategories();
        this.alertService.successAlert();
      },
      // انجام عملیات در صورت موفق بودن فرآیند حذف

      // ارسال ارور در صورت موفق نبودن فرآیند حذف
      error: (err) => {
        this.errorHandlerService.handleError(err);
      },
      // ارسال ارور در صورت موفق نبودن فرآیند حذف
    });
    // پایان فرآیند حذف
  }

  /**
   * دسته بندی محصول با آیدی rowVersion گرفتن
   * @param id آیدی دسته بندی محصول
   * @returns rowVersion
   */
  private getRowversion(id: number): string {
    return (
      this.data().find((productCategory) => {
        return productCategory.productCategoryId === id;
      })?.rowVersion ?? ''
    );
  }

  /**
   * گرفتن دوباره ی دسته بندی های محصول پس از حذف
   */
  private getProductCategories(): void {
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
                        +pc.productCategoryId === +productCategory.parentId
                      );
                    })?.name;
              data.push(
                new ProductCategoriesFilterModel(
                  productCategory.productCategoryId,
                  productCategory.isDeleted,
                  productCategory.rowVersion,
                  productCategory.parentId,
                  parentName ?? '',
                  productCategory.name,
                ),
              );
            },
          );

          this.data.set(data);
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
  }
}
