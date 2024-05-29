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

  constructor(
    private httpClient: HttpClient,
    private metavisionUrlsService: MetavisionUrlsService,
    private errorHandlerService: ErrorHandlerService,
    private alertService: AlertService
  ) {}

  /**
   * گرفتن لیست نوع محصولات از ای پی آی
   * @returns لیست نوع محصولات
   */
  fetchProductCategories(): Observable<ProductCategoriesModel[]> {
    const data = this.httpClient.get<ProductCategoriesModel[]>(
      this.metavisionUrlsService.productCategoriesUrl
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

  /**
   * ارسال درخواست ساخت نوع محصول جدید به ای پی آی
   * @param productCategory اطلاعات نوع محصول جدید
   */
  createProductCategory(productCategory: ProductCategoriesModel): void {
    this.httpClient
      .post<IdRowVersionModel>(
        this.metavisionUrlsService.productCategoriesUrl,
        productCategory
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
   * گرفتن لیست نوع محصولات
   * @returns لیست نوع محصولات
   */
  getProductCategories(): ProductCategoriesModel[] {
    return this.productCategories();
  }

  /**
   * گرفتن لیست کوتاه شده نوع محصولات برای پر کردن دراپ داون از ای پی آی
   * @returns لیست کوتاه شده نوع محصولات
   */
  fetchProductCategoriesGroup(): Observable<ProductCategoriesGroupModel[]> {
    const data = this.httpClient.get<ProductCategoriesGroupModel[]>(
      this.metavisionUrlsService.productCategoriesGroupUrl
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
}
