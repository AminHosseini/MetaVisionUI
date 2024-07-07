import { PictureType } from '../enums/picture-type';

export class CreatePictureModel {
  constructor(
    public parentId: number,
    public pictureType: PictureType,
    public pictureFile: any,
    public pictureAlt: string,
    public pictureTitle: string,
  ) {}
}
