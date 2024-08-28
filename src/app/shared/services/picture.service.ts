import { Injectable, signal } from '@angular/core';
import { MetavisionUrlsService } from './metavision-urls.service';
import { HttpClient } from '@angular/common/http';
import { IdRowVersionModel } from '../models/id-rowversion.model';
import { AlertService } from './alert.service';
import { ErrorHandlerService } from './error-handler.service';
import { Subject, Observable } from 'rxjs';
import { PicturesModel } from '../models/pictures.model';
import { PicturesRequestModel } from '../models/pictures-request.model';
import { ChangePictureOrderModel } from '../models/change-picture-order.model';
import { EditPictureModel } from '../models/edit-picture.model';
import { MatDialog } from '@angular/material/dialog';
import { DeletePictureModel } from '../models/delete-picture.model';

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
    private dialog: MatDialog,
  ) {}

  // /**
  //  * ارسال درخواست ساخت عکس جدید به ای پی آی
  //  * @param form اطلاعات عکس جدید
  //  */
  // createPicture(form: FormData): void {
  //   this.httpClient
  //     .post<IdRowVersionModel>(this.metavisionUrlsService.pictureUrl, form)
  //     .subscribe({
  //       complete: () => {
  //         this.alertService.successAlert();
  //       },
  //       error: (err) => {
  //         this.errorHandlerService.handleError(err);
  //       },
  //     });
  // }
  /**
   * ارسال درخواست ساخت عکس جدید به ای پی آی
   * @param form اطلاعات عکس جدید
   * @returns rowversion مدل آیدی و
   */
  createPicture(form: FormData): Observable<IdRowVersionModel> {
    return this.httpClient.post<IdRowVersionModel>(
      this.metavisionUrlsService.pictureUrl,
      form,
    );
  }

  /**
   * ارسال درخواست تغییر اولویت نمایش عکس به ای پی آی
   * @param pics ترتیب جدید عکس ها
   * @returns rowversion مدل آیدی و
   */
  editPicturesDisplayOrder(
    pics: ChangePictureOrderModel[],
  ): Observable<IdRowVersionModel[]> {
    return this.httpClient.put<IdRowVersionModel[]>(
      this.metavisionUrlsService.pictureOrderUrl,
      pics,
    );
  }

  /**
   * ارسال درخواست تغییر اطلاعات عکس به ای پی آی
   * @param pic اطلاعات جدید عکس
   * @returns rowversion مدل آیدی و
   */
  editPicture(pic: EditPictureModel): void {
    this.httpClient
      .put<IdRowVersionModel>(
        this.metavisionUrlsService.pictureEditUrl(pic.id),
        pic,
      )
      .subscribe({
        complete: () => {
          this.alertService.successAlert();
          this.dialog.closeAll();
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
  }

  /**
   * ارسال درخواست حذف عکس به ای پی آی
   * @param pic عکس
   * @returns عکس حذف شد؟
   */
  deletePicture(pic: DeletePictureModel): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.metavisionUrlsService.pictureUrl,
      pic,
    );
  }

  /**
   * گرفتن لیست عکس از ای پی آی
   * @param model مدل درخواست عکس
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
   * گرفتن لیست عکس از ای پی آی بدون سابسکرایب کردن
   * @param model مدل درخواست عکس
   * @returns لیست عکس
   */
  fetchPicturesWithoutSubscription(
    model: PicturesRequestModel,
  ): Observable<PicturesModel[]> {
    return this.httpClient.get<PicturesModel[]>(
      this.metavisionUrlsService.getPicturesUrl(model),
    );
  }

  /**
   * گرفتن لیست عکس
   * @returns لیست عکس
   */
  getPictures(): PicturesModel[] {
    return this.pictures();
  }
}
