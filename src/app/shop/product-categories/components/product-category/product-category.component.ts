import {
  Component,
  OnDestroy,
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { HelperService } from '../../../../shared/services/helper.service';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductCategoriesGroupModel } from '../../models/product-categories-group.model';
import { ICanComponentDeactivate } from '../../../../shared/interfaces/ICanComponentDeactivate';
import { GuardsHelperService } from '../../../../shared/services/guards-helper.service';
import { ButtonHelperDirective } from '../../../../shared/directives/button-helper.directive';
import { AddIconDirective } from '../../../../shared/directives/add-icon.directive';
import { FontHelperDirective } from '../../../../shared/directives/font-helper.directive';
import { KeywordElementDirective } from '../../../../shared/directives/keyword-element.directive';
import { FormFieldDirective } from '../../../../shared/directives/form-field.directive';
import { DeleteKeywordBtnDirective } from '../../../../shared/directives/delete-keyword-btn.directive';
import { AddKeywordsBtnDirective } from '../../../../shared/directives/add-keywords-btn.directive';
import { CustomValidationMessageDirective } from '../../../../shared/directives/custom-validation-message.directive';
import { CustomValidationMessageService } from '../../../../shared/services/custom-validation-message.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { ServerValidationAlertComponent } from '../../../../shared/components/server-validation-alert/server-validation-alert.component';
import { PlaceholderDirective } from '../../../../shared/directives/placeholder.directive';
import { ProductCategoryModel } from '../../models/product-category.model';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'shop-product-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
    ButtonHelperDirective,
    AddIconDirective,
    FontHelperDirective,
    KeywordElementDirective,
    FormFieldDirective,
    DeleteKeywordBtnDirective,
    AddKeywordsBtnDirective,
    CustomValidationMessageDirective,
    PlaceholderDirective,
    ServerValidationAlertComponent,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent
  implements OnInit, OnDestroy, ICanComponentDeactivate
{
  productCategoryForm!: FormGroup;
  form: Signal<any> = viewChild('form');
  keywordEntered = signal<string>('');
  keywords = signal<string[]>(this.getKeywords());
  keywordsValidationError = signal<string>('');
  selectOptions = signal<ProductCategoriesGroupModel[]>([]);
  serverValidationErrors =
    viewChild<PlaceholderDirective>(PlaceholderDirective);
  productCategory = signal<ProductCategoryModel | null>(null);
  formDisabled = signal<boolean>(true);
  changesSaved = signal<boolean>(true);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private productCategoryService: ProductCategoryService,
    private guardsHelperService: GuardsHelperService,
    private errorHandlerService: ErrorHandlerService,
    private alertService: AlertService,
    public customValidationMessageService: CustomValidationMessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fillParentIdSelect();
    this.fillProductCategoryForm();
  }

  ngOnDestroy(): void {
    this.helperService.keywords = [];
    this.keywordsValidationError.set('');
    this.serverValidationErrors()?.viewContainerRef.clear();
  }

  /**
   * شروع فرم
   */
  private initializeForm(): void {
    this.productCategoryForm = new FormGroup({
      productCategoryId: new FormControl<number>(0),
      rowVersion: new FormControl<string>(''),
      parentId: new FormControl<number>(0),
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      seo: new FormGroup({
        metaDescription: new FormControl<string>('', [
          Validators.required,
          Validators.maxLength(200),
        ]),
        slug: new FormControl<string>('', [
          Validators.required,
          Validators.maxLength(200),
        ]),
        keywords: new FormControl<string[]>(this.keywords()),
      }),
    });
  }

  /**
   * پر کردن لیست و دراپ داون دسته بندی محصول اصلی
   */
  private fillParentIdSelect(): void {
    this.selectOptions.set(
      this.productCategoryService.getProductCategoriesGroup()
    );
  }

  /**
   * پر کردن فرم با دسته بندی محصول گرفته شده
   */
  private fillProductCategoryForm(): void {
    this.productCategoryForm.disable();
    this.productCategory.set(this.productCategoryService.getProductCategory());
    this.helperService.keywords = this.productCategory()?.seo.keywords!;
    this.keywords.set(this.helperService.keywords);

    this.productCategoryForm.patchValue({
      productCategoryId: this.productCategory()?.productCategoryId,
      rowVersion: this.productCategory()?.rowVersion,
      parentId: this.productCategory()?.parentId,
      name: this.productCategory()?.name,
      description: this.productCategory()?.description,
      seo: {
        slug: this.productCategory()?.seo.slug,
        keywords: this.productCategory()?.seo.keywords,
        metaDescription: this.productCategory()?.seo.metaDescription,
      },
    });
  }

  /**
   * مورد استفاده برای زمانی که اطلاعات داخل فرم تغییر کرده و ذخیره نشده
   */
  formChanged(): void {
    this.changesSaved.set(false);
  }

  /**
   * تغییر وضعیت فرم به فعال یا غیرفعال
   */
  changeFormStatus(): void {
    if (this.productCategoryForm.enabled) {
      this.productCategoryForm.disable();
      this.formDisabled.set(true);
    } else {
      this.productCategoryForm.enable();
      this.formDisabled.set(false);
    }
  }

  /**
   * عملیات های انجام شده هنگام سابمیت کردن فرم
   * @param focusElement اسکرول کردن به المنت اچ تی ام الی که بالاترین جای صفحه است
   * @returns
   */
  onSubmit(focusElement: HTMLElement): void {
    // دادن پیام خطا در صورتی که لیست کلمات کلیدی خالی بود
    if (this.helperService.keywords.length === 0) {
      this.keywordsValidationError.set(
        this.customValidationMessageService.keywordsCannotBeEmpty
      );
      return;
    }
    // دادن پیام خطا در صورتی که لیست کلمات کلیدی خالی بود

    // اسکرول کردن به المنت اچ تی ام الی
    focusElement.scrollIntoView({
      behavior: 'smooth',
    });
    // اسکرول کردن به المنت اچ تی ام الی

    // ارسال درخواست به ای پی آی
    const id: number | undefined = this.productCategory()?.productCategoryId;
    this.productCategoryService
      .editProductCategory(this.productCategoryForm.value)
      .subscribe({
        complete: () => {
          this.refillFormAfterEdit(id!);
          this.alertService.successAlert();
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
    // ارسال درخواست به ای پی آی

    // ریست کردن فرم و خالی کردن لیست کلمات کلیدی
    this.productCategoryForm.reset();
    this.form().resetForm();
    this.helperService.keywords = [];
    this.keywords.set(this.helperService.keywords);
    this.keywordsValidationError.set('');
    this.serverValidationErrors()?.viewContainerRef.clear();
    (this.productCategoryForm.controls['seo'] as FormGroup).controls[
      'keywords'
    ].patchValue(this.keywords);
    this.changesSaved.set(true);
    // ریست کردن فرم و خالی کردن لیست کلمات کلیدی

    // در صورت بروز ارور ولیدیشن سمت سرور آن را نمایش میدهد
    this.errorHandlerService.serverValidationErrors.subscribe({
      next: (errors: any) => {
        this.showServerValidationErrors(errors);
      },
    });
    // در صورت بروز ارور ولیدیشن سمت سرور آن را نمایش میدهد
  }

  /**
   * گرفتن دوباره اطلاعات و پر کردن فرم بعد از ویرایش
   * @param id آیدی دسته بندی محصول
   */
  private refillFormAfterEdit(id: number): void {
    this.productCategoryService
      .fetchProductCategoryByIdWithoutSubscription(id)
      .subscribe({
        next: (productCategory: ProductCategoryModel) => {
          this.productCategoryForm.disable();
          this.productCategory.set(productCategory);
          this.helperService.keywords = productCategory.seo.keywords!;
          this.keywords.set(this.helperService.keywords);
          this.changesSaved.set(true);
          this.formDisabled.set(true);

          this.productCategoryForm.patchValue({
            productCategoryId: productCategory.productCategoryId,
            rowVersion: productCategory.rowVersion,
            parentId: productCategory.parentId,
            name: productCategory.name,
            description: productCategory.description,
            seo: {
              slug: productCategory.seo.slug,
              keywords: productCategory.seo.keywords,
              metaDescription: productCategory.seo.metaDescription,
            },
          });
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });
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
   * فعال یا غیر فعال کردن دکمه اضافه کردن کلمه کلیدی جدید به لیست کلمات کلیدی
   * @returns فعال یا غیر فعال؟
   */
  activateAddKeywordBtn(): boolean {
    return this.keywordEntered() === '';
  }

  /**
   * اضافه کردن کلمه کلیدی جدید به لیست کلمات کلیدی
   */
  addNewKeyword(): void {
    if (!/\S/.test(this.keywordEntered())) {
      this.keywordsValidationError.set(
        this.customValidationMessageService.keywordsCannotBeEmpty
      );
      return;
    }
    if (this.keywordEntered().length > 24) {
      this.keywordsValidationError.set(
        this.customValidationMessageService.maximumKeywordCharacters
      );
      return;
    }
    if (this.helperService.keywords.length >= 8) {
      this.keywordsValidationError.set(
        this.customValidationMessageService.maximumKeywordsArrayCount
      );
      return;
    }

    this.keywordsValidationError.set('');
    this.helperService.addNewKeyword(this.keywordEntered());
    this.keywordEntered.set('');
    this.changesSaved.set(false);
  }

  /**
   * پاک کردن کلمه کلیدی از لیست کلمات کلیدی
   * @param index شماره محل قرارگیری کلمه کلیدی داخل لیست کلمات کلیدی
   */
  deleteKeyword(index: number): void {
    this.helperService.deleteKeyword(index);
  }

  /**
   * پر کردن توضیحات متا بر اساس اطلاعات وارد شده داخل توضیحات
   */
  descriptionOut(): void {
    this.helperService.autoFillMetaDescription(this.productCategoryForm);
  }

  /**
   * پر کردن اسلاگ بر اساس اطلاعات وارد شده داخل نام
   */
  nameOut(): void {
    this.helperService.autoFillSlug(this.productCategoryForm);
  }

  /**
   * گرفتن لیست کلمات کلیدی
   * @returns لیست کلمات کلیدی
   */
  getKeywords(): string[] {
    return this.helperService.getKeywords();
  }

  /**
   * تایید معتبر بودن یا نبودن فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns فرم معتبر هست یا خیر؟
   */
  ControlNotValid(
    controlName: string,
    groupName?: string
  ): boolean | undefined {
    return this.helperService.isNotValid(
      this.productCategoryForm,
      controlName,
      groupName!
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
    groupName?: string
  ): ValidationErrors | undefined | null {
    return this.helperService.getControlErrors(
      this.productCategoryForm,
      controlName,
      groupName
    );
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
      ServerValidationAlertComponent
    );
    componentRef!.instance.errors = messages;
  }

  async canDeactivate(): Promise<boolean> {
    return await this.guardsHelperService.canDeactivateWhileChangesNotSaved(
      this.changesSaved()
    );
  }
}
