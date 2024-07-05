import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldDirective } from '../../../directives/form-field.directive';
import { FontHelperDirective } from '../../../directives/font-helper.directive';
import { ButtonHelperDirective } from '../../../directives/button-helper.directive';

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
export class CreatePictureComponent {
  outputBoxVisible = false;
  progress = `0%`;
  uploadResult = '';
  fileName = '';
  fileSize = '';
  uploadStatus: number | undefined;
  pictureForm!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  /**
   * شروع فرم
   */
  // private initializeForm(): void {
  //   this.pictureForm = new FormGroup({
  //     parentId: new FormControl<number>(0),
  //     pictureFile: new FormControl<File>(null),
  //     pictureAlt: new FormControl<string>('', [
  //       Validators.required,
  //       Validators.maxLength(50),
  //     ]),
  //     pictureTitle: new FormControl<string>('', [
  //       Validators.required,
  //       Validators.maxLength(50),
  //     ]),
  //     displayOrder: new FormControl<number>(0),
  //     pictureType: new FormControl<>(),
  //   })
  // }

  onFileSelected(event: any) {
    this.outputBoxVisible = false;
    this.progress = `0%`;
    this.uploadResult = '';
    this.fileName = '';
    this.fileSize = '';
    this.uploadStatus = undefined;
    const file: File = event.dataTransfer?.files[0] || event.target?.files[0];

    if (file) {
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
}
