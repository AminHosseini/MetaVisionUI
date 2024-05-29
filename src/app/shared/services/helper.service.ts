import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  keywords: string[] = [];

  constructor() {}

  /**
   * تغییر فرمت نوع کلمه وارد شده به صورت صحیح و اضافه کردن آن به لیست کلمات کلیدی
   * @param kw کلمه کلیدی
   */
  addNewKeyword(kw: string): void {
    if (kw && kw.replace(' ', '')) {
      kw = kw
        .replace(/[^a-z0-9-آ-ی-]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      this.keywords.push(kw);
    }
  }

  /**
   * پاک کردن کلمه کلیدی از داخل لیست کلمات کلیدی
   * @param index شماره محل قرارگیری کلمه کلیدی داخل لیست کلمات کلیدی
   */
  deleteKeyword(index: number): void {
    this.keywords.splice(index, 1);
  }

  /**
   * پر کردن خودکار توضیحات متا از روی توضیحات وارد شده
   * @param form فرم
   * @returns 
   */
  autoFillMetaDescription(form: FormGroup): void {
    const di = form.controls['description'].value;
    if (!di) {
      return;
    }
    // form.patchValue({
    //   metaDescription: di,
    // });
    (form.controls['seo'] as FormGroup).controls['metaDescription'].patchValue(
      di
    );
  }

  /**
   * پر کردن خودکار اسلاگ از روی نام وارد شده
   * @param form فرم
   * @returns 
   */
  autoFillSlug(form: FormGroup): void {
    const ni = form.controls['name'].value;
    if (!ni) {
      return;
    }
    ni.replace(/[^a-z0-9-آ-ی-]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    (form.controls['seo'] as FormGroup).controls['slug'].patchValue(ni);
  }

  /**
   * گرفتن لیست کلمات کلیدی
   * @returns لیست کلمات کلیدی
   */
  getKeywords(): string[] {
    return this.keywords;
  }

  /**
   * تایید معتبر بودن یا نبودن فرم
   * @param form فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns فرم معتبر هست یا خیر؟
   */
  isNotValid(
    form: FormGroup,
    controlName: string,
    groupName?: string
  ): boolean | undefined {
    let control: AbstractControl<any, any> | null;
    if (!groupName) {
      control = form.get(controlName);
    } else {
      control = (form.controls[groupName] as FormGroup).controls[controlName];
    }
    return !control?.valid && control?.touched;
  }

  /**
   * گرفتن تمامی ارور های کنترل فرم
   * @param form فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns ارور های کنترل
   */
  getControlErrors(
    form: FormGroup,
    controlName: string,
    groupName?: string
  ): ValidationErrors | undefined | null {
    let control: AbstractControl<any, any> | null;
    if (!groupName) {
      control = form.get(controlName);
    } else {
      control = (form.controls[groupName] as FormGroup).controls[controlName];
    }
    return control?.errors;
  }
}
