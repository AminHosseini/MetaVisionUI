/**
 * مدل دسته بندی محصول
 */
export class ProductCategoriesModel {
  constructor(
    public productCategoryId: number,
    public productCategoryIdFarsi: string,
    public isDeleted: boolean,
    public serialNumber: string,
    public rowVersion: string,
    public parentId: number,
    public name: string
  ) {}
}
