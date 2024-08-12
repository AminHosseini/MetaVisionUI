import {
  Component,
  model,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonHelperDirective } from '../../directives/button-helper.directive';
import { FontHelperDirective } from '../../directives/font-helper.directive';
import { ServerValidationAlertComponent } from '../server-validation-alert/server-validation-alert.component';
import { CustomValidationMessageDirective } from '../../directives/custom-validation-message.directive';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { PlaceholderDirective } from '../../directives/placeholder.directive';
import { ICanComponentDeactivate } from '../../interfaces/ICanComponentDeactivate';
import { CustomValidationMessageService } from '../../services/custom-validation-message.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { GuardsHelperService } from '../../services/guards-helper.service';
import { HelperService } from '../../services/helper.service';
import { PictureService } from '../../services/picture.service';
import { PicturesModel } from '../../models/pictures.model';
import { AlertService } from '../../services/alert.service';
import { PicturesRequestModel } from '../../models/pictures-request.model';
import { ChangePictureOrderModel } from '../../models/change-picture-order.model';
import { PictureType } from '../../enums/picture-type';
import { EditPictureModalComponent } from './edit-picture-modal/edit-picture-modal.component';
import { OperationButtonDirective } from '../../directives/operation-button.directive';
import { OperationButtonIconDirective } from '../../directives/operation-button-icon.directive';
import { EditPictureModel } from '../../models/edit-picture.model';

@Component({
  selector: 'metavision-pictures',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    OperationButtonDirective,
    OperationButtonIconDirective,
    FormFieldDirective,
    FontHelperDirective,
    ButtonHelperDirective,
    PlaceholderDirective,
    CustomValidationMessageDirective,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.css',
})
export class PicturesComponent
  implements OnInit, OnDestroy, ICanComponentDeactivate
{
  // outputBoxVisible = false;
  // progress = `0%`;
  // uploadResult = '';
  // fileName = '';
  // fileSize = '';
  // uploadStatus: number | undefined;
  pictureForm!: FormGroup;
  form: Signal<any> = viewChild('form');
  file: File | null = null;
  outputBoxVisible = signal<boolean>(false);
  fileAddress = signal<string>('');
  fileName = signal<string>('');
  fileSize = signal<string>('');
  fileType = signal<string>('');
  serverValidationErrors =
    viewChild<PlaceholderDirective>(PlaceholderDirective);
  pictureValidationError = signal<string>('');
  allowedFormats = signal<string[]>(['image/jpeg', 'image/jpg', 'image/png']);
  allowedSize = signal<number>(3000000);
  pictures = signal<PicturesModel[]>([]);
  picturesOrderChange = signal<ChangePictureOrderModel[]>([]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private pictureService: PictureService,
    private errorHandlerService: ErrorHandlerService,
    private guardsHelperService: GuardsHelperService,
    private alertService: AlertService,
    private dialog: MatDialog,
    public customValidationMessageService: CustomValidationMessageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fillPictures();
  }

  ngOnDestroy(): void {
    this.deleteFileInfo();
    this.pictureValidationError.set('');
    this.serverValidationErrors()?.viewContainerRef.clear();
  }

  /**
   * شروع فرم
   */
  private initializeForm(): void {
    this.pictureForm = new FormGroup({
      pictureFile: new FormControl(null, [Validators.required]),
      pictureAlt: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      pictureTitle: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  /**
   * پر کردن لیست عکس
   */
  private fillPictures(): void {
    this.pictures.set(this.pictureService.getPictures());
  }

  /**
   * نمایش اطلاعات عکس آپلود شده
   * @param event ایونت
   */
  onFileSelected(event: any) {
    // this.outputBoxVisible = false;
    // this.progress = `0%`;
    // this.uploadResult = '';
    // this.fileName = '';
    // this.fileSize = '';
    // this.uploadStatus = undefined;
    // const file: File = event.dataTransfer?.files[0] || event.target?.files[0];

    // if (file) {
    //   this.file = file;
    //   this.fileName = file.name;
    //   this.fileSize = `${(file.size / 1024).toFixed(2)} کیلوبایت`;
    //   this.outputBoxVisible = true;

    //   const formData = new FormData();
    //   formData.append('file', file);

    //   const xhr = new XMLHttpRequest();
    //   xhr.open('POST', '', true);

    //   xhr.upload.onprogress = (progressEvent) => {
    //     if (progressEvent.lengthComputable) {
    //       const progress = (progressEvent.loaded / progressEvent.total) * 100;
    //       this.progress = `${Math.round(progress)}%`;
    //     }
    //   };

    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState === XMLHttpRequest.DONE) {
    //       if (xhr.status === 200) {
    //         this.uploadResult = 'بارگذاری شد';
    //       } else if (xhr.status === 400) {
    //         this.uploadResult = JSON.parse(xhr.response)!.message;
    //       } else {
    //         this.uploadResult = 'بارگزاری ناموفق!';
    //       }
    //       this.uploadStatus = xhr.status;
    //     }
    //   };

    //   xhr.send(formData);
    // }

    this.pictureValidationError.set('');
    this.deleteFileInfo();
    const file: File = event.dataTransfer?.files[0] || event.target?.files[0];

    if (file) {
      this.file = file;

      if (file.size > this.allowedSize()) {
        this.pictureValidationError.set(
          this.customValidationMessageService.fileCanNotBeLargerThan(3),
        );
        return;
      }

      if (!this.allowedFormats().includes(file.type)) {
        this.pictureValidationError.set(
          this.customValidationMessageService.fileFormatsOnly(
            this.allowedFormats(),
          ),
        );
        return;
      }

      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        this.fileAddress.set(e.target.result);
      };
      this.fileName.set(file.name);
      this.fileSize.set(`${(file.size / 1024 / 1024).toFixed(2)} مگابایت`);
      this.fileType.set(file.type);
      this.outputBoxVisible.set(true);
    }
  }

  /**
   * تبدیل سایز فایل به مگابایت و نمایش متن آن
   * @param size سایز فایل
   * @returns متن سایز فایل به مگابایت
   */
  toMegaByte(size: number): string {
    return `${(size / 1024 / 1024).toFixed(2)} مگابایت`;
  }

  /**
   * هندل کردن درگ
   * @param event ایونت درگ
   */
  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * هندل کردن دراپ
   * @param event ایونت دراپ
   */
  handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const file: File = event.dataTransfer.files[0];
      this.onFileSelected(event);
    }
  }

  /**
   * برگشت به صفحه لیست نوع محصولات
   */
  returnToProductCategories(): void {
    this.router.navigate(['/product-categories'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * تایید معتبر بودن یا نبودن فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns فرم معتبر هست یا خیر؟
   */
  ControlNotValid(
    controlName: string,
    groupName?: string,
  ): boolean | undefined {
    return this.helperService.isNotValid(
      this.pictureForm,
      controlName,
      groupName!,
    );
  }

  /**
   * گرفتن تمامی ارور های کنترل فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns ارور های کنترل
   */
  getControlErrors(
    controlName: string,
    groupName?: string,
  ): ValidationErrors | undefined | null {
    return this.helperService.getControlErrors(
      this.pictureForm,
      controlName,
      groupName,
    );
  }

  /**
   * عملیات های انجام شده هنگام سابمیت کردن فرم
   */
  onSubmit(): void {
    // گرفتن اطلاعان و تشکیل فرم دیتا
    const parentId: string =
      this.activatedRoute.snapshot.queryParams['parentId'];
    const pictureType: string =
      this.activatedRoute.snapshot.queryParams['pictureType'];
    const pictureAlt: string = this.pictureForm.controls['pictureAlt'].value;
    const pictureTitle: string =
      this.pictureForm.controls['pictureTitle'].value;

    const formData = new FormData();
    formData.append('parentId', parentId);
    formData.append('pictureType', pictureType);
    formData.append('pictureFile', this.file!);
    formData.append('pictureAlt', pictureAlt);
    formData.append('pictureTitle', pictureTitle);
    // گرفتن اطلاعان و تشکیل فرم دیتا

    // let formData: any = new FormData();
    // Object.keys(this.pictureForm.controls).forEach((formControlName) => {
    //   formData.append(
    //     formControlName,
    //     this.pictureForm.controls[`${formControlName}`].value,
    //   );
    // });
    // formData.append('parentId', parentId);
    // formData.append('pictureType', pictureType);

    // api ارسال درخواست به
    this.pictureService.createPicture(formData).subscribe({
      complete: () => {
        this.refillPictures(new PicturesRequestModel(+parentId, +pictureType));
        this.alertService.successAlert();
      },
      error: (err) => {
        this.errorHandlerService.handleError(err);
      },
    });
    // api ارسال درخواست به

    // ریست فرم و پاک کردن اطلاعات
    this.deleteFileInfo();
    this.file = null;
    this.pictureValidationError.set('');
    this.serverValidationErrors()?.viewContainerRef.clear();
    this.pictureForm.reset();
    this.form().resetForm();
    this.picturesOrderChange.set([]);
    // ریست فرم و پاک کردن اطلاعات

    // در صورت بروز ارور ولیدیشن سمت سرور آن را نمایش میدهد
    this.errorHandlerService.serverValidationErrors.subscribe({
      next: (errors: any) => {
        this.showServerValidationErrors(errors);
      },
    });
    // در صورت بروز ارور ولیدیشن سمت سرور آن را نمایش میدهد
  }

  /**
   * پر کردن دوباره لیست عکس بعد از آپلود عکس جدید
   * @param model مدل درخواست عکس
   */
  private refillPictures(model: PicturesRequestModel): void {
    this.pictureService.fetchPicturesWithoutSubscription(model).subscribe({
      next: (pictures: PicturesModel[]) => {
        this.pictures.set(pictures);
      },
      error: (err) => {
        this.errorHandlerService.handleError(err);
      },
    });
  }

  /**
   * پاک کردن اطلاعات عکس آپلود شده
   */
  private deleteFileInfo(): void {
    this.fileAddress.set('');
    this.fileName.set('');
    this.fileSize.set('');
    this.fileType.set('');
    this.outputBoxVisible.set(false);
  }

  /**
   * نمایش ارور های ولیدیشن در صورت وجود
   * @param messages ارور ها
   */
  private showServerValidationErrors(messages: string[]): void {
    const hostViewContainerRef =
      this.serverValidationErrors()?.viewContainerRef;
    hostViewContainerRef?.clear();
    const componentRef = hostViewContainerRef?.createComponent(
      ServerValidationAlertComponent,
    );
    componentRef!.instance.errors = messages;
  }

  async canDeactivate(): Promise<boolean> {
    let orderchanged = this.picturesOrderChange().length > 0;
    return await this.guardsHelperService.canDeactivateWithFileAsync(
      this.pictureForm,
      this.file,
      orderchanged,
    );
  }

  /**
   * عملیات های انجام شده برای تغییر اولویت نمایش عکس هنگام درگ دراپ
   * @param event ایونت درگ دراپ
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.pictures(), event.previousIndex, event.currentIndex);

    const pictureType: number =
      +this.activatedRoute.snapshot.queryParams['pictureType'];

    this.picturesOrderChange.set([]);
    for (let index = 0; index < this.pictures().length; index++) {
      let element: PicturesModel = this.pictures()[index];

      this.picturesOrderChange().push({
        pictureId: element.pictureId,
        displayOrder: index + 1,
        pictureType: pictureType as PictureType,
        rowVersion: element.rowVersion,
      });
    }
  }

  /**
   * ارسال درخواست تغییر اولویت نمایش عکس به ای پی آی
   */
  changePictureOrders(): void {
    const parentId: string =
      this.activatedRoute.snapshot.queryParams['parentId'];
    const pictureType: string =
      this.activatedRoute.snapshot.queryParams['pictureType'];

    this.pictureService
      .editPicturesDisplayOrder(this.picturesOrderChange())
      .subscribe({
        complete: () => {
          this.refillPictures(
            new PicturesRequestModel(+parentId, +pictureType),
          );
          this.alertService.successAlert();
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });

    this.picturesOrderChange.set([]);
  }

  openDialog(
    pictureId: number,
    rowVersion: string,
    pictureAlt: string,
    pictureTitle: string,
  ): void {
    /*const dialogRef = */ this.dialog.open(EditPictureModalComponent, {
      data: new EditPictureModel(
        pictureId,
        pictureAlt,
        pictureTitle,
        rowVersion,
      ),
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }
}
