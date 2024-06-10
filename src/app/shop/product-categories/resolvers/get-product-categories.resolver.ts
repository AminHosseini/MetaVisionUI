import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoryService } from '../services/product-category.service';

export const getProductCategoriesResolver: ResolveFn<
  ProductCategoriesModel[]
> = (route, state) => {
  const productCategoryService = inject(ProductCategoryService);
  return productCategoryService.fetchProductCategories();
};
