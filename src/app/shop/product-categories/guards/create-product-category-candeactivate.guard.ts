import { CanDeactivateFn } from '@angular/router';
import { ICanComponentDeactivate } from '../../../shared/interfaces/ICanComponentDeactivate';
/**
 * اطمینان از خارج نشدن از فرم ‌ساخت دسته بندی محصول جدید ذخیره نشده
 * @param component کامپوننت
 * @param currentRoute آدرس فعلی
 * @param currentState وضعیت فعلی
 * @param nextState وضعیت بعدی
 * @returns از فرم خارج شود یا خیر؟
 */
export const createProductCategoryCandeactivateGuard: CanDeactivateFn<
  ICanComponentDeactivate
> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
