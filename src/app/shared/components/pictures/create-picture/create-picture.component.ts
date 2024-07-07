import { Component, OnInit, Signal, viewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { FormFieldDirective } from '../../../directives/form-field.directive';
import { FontHelperDirective } from '../../../directives/font-helper.directive';
import { ButtonHelperDirective } from '../../../directives/button-helper.directive';
import { CustomValidationMessageService } from '../../../services/custom-validation-message.service';
import { HelperService } from '../../../services/helper.service';
import { PictureService } from '../../../services/picture.service';
import { CreatePictureModel } from '../../../models/create-picture.model';
import { PictureType } from '../../../enums/picture-type';

@Component({
  selector: 'metavision-create-picture',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    FormFieldDirective,
    FontHelperDirective,
    ButtonHelperDirective,
  ],
  templateUrl: './create-picture.component.html',
  styleUrl: './create-picture.component.css',
})
export class CreatePictureComponent implements OnInit {
  outputBoxVisible = false;
  progress = `0%`;
  uploadResult = '';
  fileName = '';
  fileSize = '';
  uploadStatus: number | undefined;
  pictureForm!: FormGroup;
  form: Signal<any> = viewChild('form');
  file: any;

  constructor(
    private router: Router,
    // private activatedRouteSnapshot: ActivatedRouteSnapshot,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private pictureService: PictureService,
    public customValidationMessageService: CustomValidationMessageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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

  onFileSelected(event: any) {
    this.outputBoxVisible = false;
    this.progress = `0%`;
    this.uploadResult = '';
    this.fileName = '';
    this.fileSize = '';
    this.uploadStatus = undefined;
    const file: File = event.dataTransfer?.files[0] || event.target?.files[0];

    if (file) {
      this.file = file;
      this.fileName = file.name;
      this.fileSize = `${(file.size / 1024).toFixed(2)} کیلوبایت`;
      this.outputBoxVisible = true;

      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '', true);

      xhr.upload.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          this.progress = `${Math.round(progress)}%`;
        }
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            this.uploadResult = 'بارگذاری شد';
          } else if (xhr.status === 400) {
            this.uploadResult = JSON.parse(xhr.response)!.message;
          } else {
            this.uploadResult = 'بارگزاری ناموفق!';
          }
          this.uploadStatus = xhr.status;
        }
      };

      xhr.send(formData);
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

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

  onSubmit(): void {
    const parentId: number =
      +this.activatedRoute.snapshot.queryParams['parentId'];
    const pictureType: number =
      +this.activatedRoute.snapshot.queryParams['pictureType'];
    const pictureAlt: string = this.pictureForm.controls['pictureAlt'].value;
    const pictureTitle: string =
      this.pictureForm.controls['pictureTitle'].value;

    const pictureModel = new CreatePictureModel(
      parentId,
      pictureType as PictureType,
      this.file,
      pictureAlt,
      pictureTitle,
    );

    this.pictureService.createPicture(pictureModel);
    this.pictureForm.reset();
    this.form().resetForm();
  }
}
