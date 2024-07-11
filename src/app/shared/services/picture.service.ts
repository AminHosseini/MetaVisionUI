import { Injectable } from '@angular/core';
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
   * @param form اطلاعات عکس جدید
   */
  createPicture(form: FormData): void {
    this.httpClient
      .post<IdRowVersionModel>(this.metavisionUrlsService.pictureUrl, form)
      .subscribe({
        complete: () => {
          this.alertService.successAlert();
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
  }
}
