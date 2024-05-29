import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetavisionUrlsService {
  private domain: string = 'https://localhost:7191/api';

  //#region productCategories

  /** آدرس ای پی آی گرفتن تمامی دسته بندی های محصولات و ساخت دسته بندی محصول جدید*/
  get productCategoriesUrl(): string {
    return `${this.domain}/product-categories`;
  }

  /** آدرس ای پی آی گرفتن تمامی دسته بندی های محصولات به صورت کوتاه شده */
  get productCategoriesGroupUrl(): string {
    return `${this.domain}/product-categories?select=productCategoryId,parentId,name&filter=parentId eq null`;
  }
  
  //#endregion
}
