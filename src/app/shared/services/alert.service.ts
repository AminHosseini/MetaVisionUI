import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  /**
   * نمایش ارور با پیام داده شده
   * @returns آلرت ارور
   */
  customMessageAlert(message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      showConfirmButton: false,
      timer: 4000,
      icon: 'error',
      text: message,
    });
  }

  /**
   * .نمایش پیام عملیات با موفقیت انجام شد
   * @returns پیام موفقیت
   */
  successAlert(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'success',
      title: 'عملیات با موفقیت انجام شد.',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /**
   * .نمایش پیام خطا در دریافت اطلاعات
   * @returns پیام خطا
   */
  errorAlert(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'خطا در دریافت اطلاعات',
      text: 'لطفا کارشناسان مارا از خطای به وجود آمده مطلع سازید.',
      showConfirmButton: false,
      timer: 6000,
      icon: 'error',
    });
  }

  /**
   * نمایش سوال آیا خارج میشوید؟
   * @returns سوال برای تایید یا رد کردن
   */
  async exitAlertAsync(): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title: 'آیا خارج میشوید؟',
      text: 'در صورت خارج شدن اطلاعات وارد شده در این فرم از بین میروند.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'خیر',
      cancelButtonColor: '#c9c5b9',
      confirmButtonText: 'بله',
      confirmButtonColor: '#9966CC',
      reverseButtons: true,
    });
  }
}
