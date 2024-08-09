/**
 *  مدل درخواست عکس
 */
export class PicturesRequestModel {
  constructor(
    public parentId: number,
    public pictureType: number,
  ) {}
}
