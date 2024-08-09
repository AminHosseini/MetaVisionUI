import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PicturesRequestModel } from '../models/pictures-request.model';
import { PictureService } from '../services/picture.service';
import { PicturesModel } from '../models/pictures.model';

export const getPicturesResolver: ResolveFn<PicturesModel[]> = (
  route,
  state,
) => {
  const parentId = route.queryParams['parentId'];
  const pictureType = route.queryParams['pictureType'];
  const model = new PicturesRequestModel(parentId, pictureType);
  const pictureService = inject(PictureService);
  return pictureService.fetchPictures(model);
};
