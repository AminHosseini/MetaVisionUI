import { SeoModel } from '../../../shared/models/seo.model';

/**
 * مدل دسته بندی محصول
 */
export class ProductCategoryModel {
  constructor(
    public productCategoryId: number,
    public isDeleted: boolean,
    public rowVersion: string,
    public parentId: number,
    public name: string,
    public description: string,
    public seo: SeoModel,
  ) {}
}
