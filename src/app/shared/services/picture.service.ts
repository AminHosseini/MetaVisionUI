import { Injectable, signal } from '@angular/core';
import { MetavisionUrlsService } from './metavision-urls.service';
import { HttpClient } from '@angular/common/http';
import { IdRowVersionModel } from '../models/id-rowversion.model';
import { AlertService } from './alert.service';
import { ErrorHandlerService } from './error-handler.service';
import { Subject, Observable } from 'rxjs';
import { PicturesModel } from '../models/pictures.model';
import { PicturesRequestModel } from '../models/pictures-request.model';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private pictures = signal<PicturesModel[]>([]);
  picturesChanged = new Subject<PicturesModel[]>();

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

  /**
   * گرفتن لیست عکس از ای پی آی
   * @returns لیست عکس
   */
  fetchPictures(model: PicturesRequestModel): Observable<PicturesModel[]> {
    const data = this.httpClient.get<PicturesModel[]>(
      this.metavisionUrlsService.getPicturesUrl(model),
    );
    data.subscribe({
      next: (pictures: PicturesModel[]) => {
        this.pictures.set(pictures);
        this.picturesChanged.next(this.pictures());
      },
      error: (err) => {
        this.errorHandlerService.handleError(err.status);
      },
    });
    return data;
  }

  /**
   * گرفتن لیست عکس
   * @returns لیست عکس
   */
  getPictures(): PicturesModel[] {
    return this.pictures();
  }
}
