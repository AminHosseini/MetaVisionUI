/**
 *  مدل برای ویرایش عکس
 */
export class EditPictureModel {
  constructor(
    public id: number,
    public pictureAlt: string,
    public pictureTitle: string,
    public rowVersion: string,
  ) {}
}
