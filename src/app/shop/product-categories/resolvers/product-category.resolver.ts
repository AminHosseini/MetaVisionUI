import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoryService } from '../services/product-category.service';

/**
 * اطمینان از ارسال درخواست دریافت اطلاعات دسته بندی محصولات به ای پی آی هنگام روت کردن
 * @param route آدرس
 * @param state وضعیت
 * @returns لیست نوع محصولات
 */
export const productCategoryResolver: ResolveFn<ProductCategoriesModel[]> = (
  route,
  state
) => {
  const productCategoryService = inject(ProductCategoryService);
  return productCategoryService.fetchProductCategories();
};
