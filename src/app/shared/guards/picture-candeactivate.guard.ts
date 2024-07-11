import { CanDeactivateFn } from '@angular/router';
import { ICanComponentDeactivate } from '../interfaces/ICanComponentDeactivate';

/**
 * اطمینان از خارج نشدن از فرم ساخت عکس جدید
 * @param component کامپوننت
 * @param currentRoute آدرس فعلی
 * @param currentState وضعیت فعلی
 * @param nextState وضعیت بعدی
 * @returns از فرم خارج شود یا خیر؟
 */
export const pictureCandeactivateGuard: CanDeactivateFn<
  ICanComponentDeactivate
> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
