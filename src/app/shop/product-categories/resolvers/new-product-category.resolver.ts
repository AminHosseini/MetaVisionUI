import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoriesGroupModel } from '../models/product-categories-group.model';
import { ProductCategoryService } from '../services/product-category.service';

/**
 * اطمینان از ارسال درخواست دریافت اطلاعات کوتاه شده دسته بندی محصولات به ای پی آی هنگام روت کردن
 * @param route آدرس
 * @param state وضعیت
 * @returns لیست کوتاه شده نوع محصولات
 */
export const newProductCategoryResolver: ResolveFn<
  ProductCategoriesGroupModel[]
> = (route, state) => {
  const productCategoryService = inject(ProductCategoryService);
  return productCategoryService.fetchProductCategoriesGroup();
};
