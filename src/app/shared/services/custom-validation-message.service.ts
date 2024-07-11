import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationMessageService {
  constructor() {}

  get fieldCannotBeEmpty(): string {
    return 'این فیلد نمیتواند خالی باشد';
  }

  get maximumFieldCharacters(): string {
    return 'تعداد کاراکتر های استفاده شده بیشتر از حد مجاز است';
  }

  get keywordsCannotBeEmpty(): string {
    return 'کلمات کلیدی نمیتواند خالی باشد!';
  }

  get maximumKeywordCharacters(): string {
    return 'فقط مجاز به وارد کردن کلمه با ۲۴ کاراکتر می باشید!';
  }

  get maximumKeywordsArrayCount(): string {
    return 'فقط مجاز به وارد کردن ۸ کلمه کلیدی می باشید!';
  }

  fileCanNotBeLargerThan(n: number): string {
    return `حجم فایل باید کمتر از ${n} مگابایت باشد`;
  }

  fileFormatsOnly(formats: string[]): string {
    let extensions = formats.join(', ');
    return `فقط مجاز به استفاده از فایل با فرمت های ${extensions} هستید`;
  }

  /**
   * ساخت پیام ارور با توجه به ارور ها
   * @param errors ارور ها
   * @returns لیستی از پیام ها
   */
  createErrorMessage(errors: any): string[] {
    let massages: string[] = [];

    if (errors) {
      if (errors.name) {
        for (const error of errors.name) {
          massages.push(`نام: ${error}\n`);
        }
      }

      if (errors.description) {
        for (const error of errors.description) {
          massages.push(`توضیحات: ${error}\n`);
        }
      }

      if (errors['seo.Slug']) {
        for (const error of errors['seo.Slug']) {
          massages.push(`اسلاگ: ${error}\n`);
        }
      }

      if (errors['seo.MetaDescription']) {
        for (const error of errors['seo.MetaDescription']) {
          massages.push(`توضیحات متا: ${error}\n`);
        }
      }

      if (errors['seo.Keywords']) {
        for (const error of errors['seo.Keywords']) {
          massages.push(`کلمات کلیدی: ${error}\n`);
        }
      }

      for (let index = 0; index < 8; index++) {
        if (errors[`seo.Keywords[${index}]`]) {
          for (const error of errors[`seo.Keywords[${index}]`]) {
            massages.push(`کلمات کلیدی: ${error}\n`);
          }
        }
      }

      if (errors.pictureFile) {
        for (const error of errors.pictureFile) {
          massages.push(`فایل: ${error}\n`);
        }
      }

      if (errors.pictureAlt) {
        for (const error of errors.pictureAlt) {
          massages.push(`آلت عکس: ${error}\n`);
        }
      }

      if (errors.pictureTitle) {
        for (const error of errors.pictureTitle) {
          massages.push(`عنوان عکس: ${error}\n`);
        }
      }
    }
    const uniq = [...new Set(massages)];
    return uniq;
  }
}
