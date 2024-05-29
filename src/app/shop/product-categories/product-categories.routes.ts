import { Routes } from '@angular/router';
import { createProductCategoryCandeactivateGuard } from './guards/create-product-category-candeactivate.guard';
import { newProductCategoryResolver } from './resolvers/new-product-category.resolver';
import { productCategoryResolver } from './resolvers/product-category.resolver';

/**
 * روت های دسته بندی محصولات
 */
export const productCategoriesRoutes: Routes = [
  {
    path: 'product-categories',
    loadComponent: () =>
      import('./components/get-product-categories/get-product-categories.component').then(
        (c) => c.GetProductCategoriesComponent
      ),
    resolve: [productCategoryResolver],
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
];
