import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class GuardsHelperService {
  constructor(private alertService: AlertService) {}

  /**
   * اجازه دادن و یا ندادن برای خروج از فرم ذخیره نشده دارای کلمات کلیدی
   * @param form فرم
   * @param keywords لیست کلمات کلیدی
   * @returns آیا مجاز به تغییر مسیر است؟
   */
  async canDeactivateWithKeywordsAsync(form: FormGroup, keywords: string[]): Promise<boolean> {
    let allowNavigatation: boolean = true;
    if (form.touched || keywords.length !== 0) {
      const result = await this.alertService.exitAlertAsync();

      if (result.isConfirmed) {
        allowNavigatation = true;
      } else {
        allowNavigatation = false;
      }
    }
    return allowNavigatation;
  }
}
