import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditPictureModel } from '../../../models/edit-picture.model';
import { FormFieldDirective } from '../../../directives/form-field.directive';
import { FontHelperDirective } from '../../../directives/font-helper.directive';
import { HelperService } from '../../../services/helper.service';
import { CustomValidationMessageService } from '../../../services/custom-validation-message.service';
import { ButtonHelperDirective } from '../../../directives/button-helper.directive';
import { PictureService } from '../../../services/picture.service';
import { AlertService } from '../../../services/alert.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-edit-picture-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormFieldDirective,
    FontHelperDirective,
    ButtonHelperDirective,
  ],
  templateUrl: './edit-picture-modal.component.html',
  styleUrl: './edit-picture-modal.component.css',
})
export class EditPictureModalComponent implements OnInit {
  editPictureForm!: FormGroup;
  form: Signal<any> = viewChild('form');
  readonly dialogRef = inject(MatDialogRef<EditPictureModalComponent>);
  readonly data = inject<EditPictureModel>(MAT_DIALOG_DATA);

  constructor(
    private helperService: HelperService,
    private pictureService: PictureService,
    private alertService: AlertService,
    private errorHandlerService: ErrorHandlerService,
    public customValidationMessageService: CustomValidationMessageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fillEditPictureForm(this.data);
  }

  /**
   * شروع فرم
   */
  private initializeForm(): void {
    this.editPictureForm = new FormGroup({
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
      this.editPictureForm,
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
      this.editPictureForm,
      controlName,
      groupName,
    );
  }

  /**
   * پر کردن فرم با اطلاعات عکس گرفته شده
   */
  private fillEditPictureForm(editPictureModel: EditPictureModel): void {
    this.editPictureForm.patchValue({
      pictureAlt: editPictureModel.pictureAlt,
      pictureTitle: editPictureModel.pictureTitle,
    });
  }

  /**
   * بستن مودال ویرایش عکس
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * عملیات های انجام شده به هنگام سابمیت کردن فرم
   */
  onSubmit(): void {
    const model = new EditPictureModel(
      +this.data.id,
      this.editPictureForm.controls['pictureAlt'].value,
      this.editPictureForm.controls['pictureTitle'].value,
      this.data.rowVersion,
    );

    this.pictureService.editPicture(model);
  }
}
