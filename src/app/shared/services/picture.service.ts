import { Injectable } from '@angular/core';
import { CreatePictureModel } from '../models/create-picture.model';
import { MetavisionUrlsService } from './metavision-urls.service';
import { HttpClient } from '@angular/common/http';
import { IdRowVersionModel } from '../models/id-rowversion.model';
import { AlertService } from './alert.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(
    private httpClient: HttpClient,
    private metavisionUrlsService: MetavisionUrlsService,
    private alertService: AlertService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  /**
   * ارسال درخواست ساخت عکس جدید به ای پی آی
   * @param picture اطلاعات عکس جدید
   */
  createPicture(picture: CreatePictureModel): void {
    debugger;
    this.httpClient
      .post<IdRowVersionModel>(this.metavisionUrlsService.pictureUrl, picture)
      .subscribe({
        complete: () => {
          debugger;
          this.alertService.successAlert();
        },
        error: (err) => {
          debugger;
          this.errorHandlerService.handleError(err);
        },
      });
  }
}
