import { PictureInfoModel } from './picture-info.model';

/**
 *  مدل عکس
 */
export class PicturesModel {
  constructor(
    public pictureId: number,
    public rowVersion: string,
    public pictureInfo: PictureInfoModel,
    public pictureAlt: string,
    public pictureTitle: string,
    public displayOrder: number,
  ) {}
}
