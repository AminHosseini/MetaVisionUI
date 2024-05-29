export interface ICanComponentDeactivate {
  /**
   * اجازه دادن و یا ندادن برای خروج از فرم ذخیره نشده
   * @returns از فرم خارج شود یا خیر؟
   */
  canDeactivate: () => Promise<boolean>;
}
