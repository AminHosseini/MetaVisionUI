/**
 * مدل دسته بندی های محصول
 */
export class ProductCategoriesModel {
  constructor(
    public productCategoryId: number,
    public isDeleted: boolean,
    public rowVersion: string,
    public parentId: number,
    public name: string
  ) {}
}
