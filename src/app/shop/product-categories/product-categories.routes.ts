import { Routes } from '@angular/router';
import { createProductCategoryCandeactivateGuard } from './guards/create-product-category-candeactivate.guard';
import { newProductCategoryResolver } from './resolvers/new-product-category.resolver';
import { productCategoryResolver } from './resolvers/product-category.resolver';
import { getProductCategoriesResolver } from './resolvers/get-product-categories.resolver';
import { getProductCategoryCanactivateGuard } from './guards/get-product-category-canactivate.guard';
import { getProductCategoryCandeactivateGuard } from './guards/get-product-category-candeactivate.guard';

/**
 * روت های دسته بندی محصولات
 */
export const productCategoriesRoutes: Routes = [
  {
    path: 'product-categories',
    loadComponent: () =>
      import(
        './components/get-product-categories/get-product-categories.component'
      ).then((c) => c.GetProductCategoriesComponent),
    resolve: [getProductCategoriesResolver],
  },

  {
    path: 'product-categories/new',
    loadComponent: () =>
      import(
        './components/create-product-category/create-product-category.component'
      ).then((c) => c.CreateProductCategoryComponent),
    resolve: [newProductCategoryResolver],
    canDeactivate: [createProductCategoryCandeactivateGuard],
  },

  {
    path: 'product-categories/:id',
    loadComponent: () =>
      import('./components/product-category/product-category.component').then(
        (c) => c.ProductCategoryComponent
      ),
    resolve: [productCategoryResolver, newProductCategoryResolver],
    canDeactivate: [getProductCategoryCandeactivateGuard],
    canActivate: [getProductCategoryCanactivateGuard],
  },
];
