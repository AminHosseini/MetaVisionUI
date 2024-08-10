import { PictureType } from '../enums/picture-type';

/**
 *  مدل تغییر اولویت نمایش عکس
 */
export class ChangePictureOrderModel {
  constructor(
    public pictureId: number,
    public displayOrder: number,
    public pictureType: PictureType,
    public rowVersion: string,
  ) {}
}
