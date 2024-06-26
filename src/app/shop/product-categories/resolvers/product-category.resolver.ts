import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategoryModel } from '../models/product-category.model';

/**
 * اطمینان از ارسال درخواست دریافت اطلاعات دسته بندی محصول با آیدی به ای پی آی هنگام روت کردن
 * @param route آدرس
 * @param state وضعیت
 * @returns نوع محصول
 */
export const productCategoryResolver: ResolveFn<ProductCategoryModel> = (
  route,
  state,
) => {
  const id = route.params['id'];
  const productCategoryService = inject(ProductCategoryService);
  return productCategoryService.fetchProductCategoryById(id);
};
