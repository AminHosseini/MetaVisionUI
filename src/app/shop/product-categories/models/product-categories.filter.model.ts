/**
 * مدل دسته بندی های محصول برای استفاده در جدول و فیلتر کردن
 */
export class ProductCategoriesFilterModel {
  constructor(
    public productCategoryId: number,
    public isDeleted: boolean,
    public rowVersion: string,
    public parentId: number,
    public parentName: string,
    public name: string,
  ) {}
}
