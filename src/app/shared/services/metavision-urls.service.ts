import { Injectable } from '@angular/core';
import { PicturesRequestModel } from '../models/pictures-request.model';

@Injectable({
  providedIn: 'root',
})
export class MetavisionUrlsService {
  private domain: string = 'https://localhost:7191/api';

  // productCategories

  /** آدرس ای پی آی گرفتن تمامی دسته بندی های محصولات و ساخت دسته بندی محصول جدید*/
  get productCategoriesUrl(): string {
    return `${this.domain}/product-categories`;
  }

  /** آدرس ای پی آی گرفتن تمامی دسته بندی های محصولات به صورت کوتاه شده */
  get productCategoriesGroupUrl(): string {
    return `${this.domain}/product-categories?select=productCategoryId,parentId,name&filter=parentId eq null`;
  }

  /** آدرس ای پی آی گرفتن تمامی دسته بندی های محصولات و ساخت دسته بندی محصول جدید*/
  productCategoryByIdUrl(id: number): string {
    return `${this.domain}/product-categories/${id}`;
  }

  // picture

  /** آدرس ای پی آی ساخت عکس جدید*/
  get pictureUrl(): string {
    return `${this.domain}/pictures`;
  }

  /** آدرس ای پی آی گرفتن تمامی دسته بندی های محصولات و ساخت دسته بندی محصول جدید*/
  getPicturesUrl(model: PicturesRequestModel): string {
    return `${this.domain}/pictures?parentId=${model.parentId}&pictureType=${model.pictureType}`;
  }

  /** آدرس ای پی آی ویرایش ترتیب نمایش عکس ها*/
  get pictureOrderUrl(): string {
    return `${this.domain}/pictures/order`;
  }
}
