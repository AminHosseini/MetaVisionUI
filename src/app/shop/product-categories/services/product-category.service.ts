import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoriesGroupModel } from '../models/product-categories-group.model';
import { IdRowVersionModel } from '../../../shared/models/id-rowversion.model';
import { MetavisionUrlsService } from '../../../shared/services/metavision-urls.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ProductCategoryModel } from '../models/product-category.model';
import { ProductCategoriesFilterModel } from '../models/product-categories.filter.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  // private productCategories: ProductCategoriesModel[] = [];
  private productCategories = signal<ProductCategoriesModel[]>([]);
  productCategoriesChanged = new Subject<ProductCategoriesModel[]>();

  // private productCategoriesGroup: ProductCategoriesGroupModel[] = [];
  private productCategoriesGroup = signal<ProductCategoriesGroupModel[]>([]);
  productCategoriesGroupChanged = new Subject<ProductCategoriesGroupModel[]>();

  private productCategory = signal<ProductCategoryModel | null>(null);
  productCategoryChanged = new Subject<ProductCategoryModel>();

  constructor(
    private httpClient: HttpClient,
    private metavisionUrlsService: MetavisionUrlsService,
    private errorHandlerService: ErrorHandlerService,
    private alertService: AlertService,
  ) {}

  /**
   * گرفتن لیست نوع محصولات از ای پی آی
   * @returns لیست نوع محصولات
   */
  fetchProductCategories(): Observable<ProductCategoriesModel[]> {
    const data = this.httpClient.get<ProductCategoriesModel[]>(
      this.metavisionUrlsService.productCategoriesUrl,
    );
    data.subscribe({
      next: (productCategories: ProductCategoriesModel[]) => {
        this.productCategories.set(productCategories);
        this.productCategoriesChanged.next(this.productCategories());
      },
      error: (err) => {
        this.errorHandlerService.handleError(err.status);
      },
    });
    return data;
  }

  fetchProductCategoriesWithoutSubscription(): Observable<
    ProductCategoriesModel[]
  > {
    return this.httpClient.get<ProductCategoriesModel[]>(
      this.metavisionUrlsService.productCategoriesUrl,
    );
  }

  /**
   * گرفتن لیست نوع محصولات
   * @returns لیست نوع محصولات
   */
  getProductCategories(): ProductCategoriesFilterModel[] {
    const data: ProductCategoriesFilterModel[] = [];

    this.productCategories().forEach(
      (productCategory: ProductCategoriesModel) => {
        const parentName: string | undefined =
          +productCategory.parentId === 0 || productCategory.parentId === null
            ? '-'
            : this.productCategories().find((pc) => {
                return +pc.productCategoryId === +productCategory.parentId;
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
    return data;
  }

  /**
   * ارسال درخواست ساخت نوع محصول جدید به ای پی آی
   * @param productCategory اطلاعات نوع محصول جدید
   */
  createProductCategory(productCategory: ProductCategoriesModel): void {
    this.httpClient
      .post<IdRowVersionModel>(
        this.metavisionUrlsService.productCategoriesUrl,
        productCategory,
      )
      .subscribe({
        complete: () => {
          this.alertService.successAlert();
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
  }

  /**
   * گرفتن لیست کوتاه شده نوع محصولات برای پر کردن دراپ داون از ای پی آی
   * @returns لیست کوتاه شده نوع محصولات
   */
  fetchProductCategoriesGroup(): Observable<ProductCategoriesGroupModel[]> {
    const data = this.httpClient.get<ProductCategoriesGroupModel[]>(
      this.metavisionUrlsService.productCategoriesGroupUrl,
    );
    data.subscribe({
      next: (productCategoriesGroup: ProductCategoriesGroupModel[]) => {
        this.productCategoriesGroup.set(productCategoriesGroup);
        this.productCategoriesGroupChanged.next(this.productCategoriesGroup());
      },
      error: (err) => {
        this.errorHandlerService.handleError(err.status);
      },
    });
    return data;
  }

  /**
   * گرفتن لیست کوتاه شده نوع محصولات برای پر کردن دراپ داون
   * @returns لیست کوتاه شده نوع محصولات
   */
  getProductCategoriesGroup(): ProductCategoriesGroupModel[] {
    return this.productCategoriesGroup();
  }

  /**
   * گرفتن نوع محصول با آیدی از ای پی آی
   * @param id آیدی دسته بندی محصول
   * @returns نوع محصول
   */
  fetchProductCategoryById(id: number): Observable<ProductCategoryModel> {
    const data = this.httpClient.get<ProductCategoryModel>(
      this.metavisionUrlsService.productCategoryByIdUrl(id),
    );
    data.subscribe({
      next: (productCategory: ProductCategoryModel) => {
        this.productCategory.set(productCategory);
        this.productCategoryChanged.next(this.productCategory()!);
      },
      error: (err) => {
        this.errorHandlerService.handleError(err.status);
      },
    });
    return data;
  }

  /**
   * گرفتن لیست نوع محصولات
   * @returns لیست نوع محصولات
   */
  getProductCategory(): ProductCategoryModel {
    return this.productCategory()!;
  }

  /**
   * ویرایش دسته بندی محصول با آیدی
   * @param productCategory اطلاعات دسته بندی محصولی که قرار است ویرایش شود
   */
  editProductCategory(
    productCategory: ProductCategoryModel,
  ): Observable<IdRowVersionModel> {
    return this.httpClient.put<IdRowVersionModel>(
      this.metavisionUrlsService.productCategoryByIdUrl(
        productCategory.productCategoryId,
      ),
      productCategory,
    );
  }

  /**
   * گرفتن نوع محصول با آیدی از ای پی آی بدون سابسکرایب کردن
   * @param id آیدی دسته بندی محصول
   * @returns نوع محصول
   */
  fetchProductCategoryByIdWithoutSubscription(
    id: number,
  ): Observable<ProductCategoryModel> {
    return this.httpClient.get<ProductCategoryModel>(
      this.metavisionUrlsService.productCategoryByIdUrl(id),
    );
  }

  /**
   * پاک کردن دسته بندی محصول
   * @param model دسته بندی محصول RowVersion آیدی و
   */
  deleteProductCategory(
    model: IdRowVersionModel,
  ): Observable<IdRowVersionModel> {
    debugger;
    return this.httpClient.patch<IdRowVersionModel>(
      this.metavisionUrlsService.productCategoriesUrl,
      model,
    );
  }
}
