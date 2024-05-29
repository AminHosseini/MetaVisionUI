import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private count = 0;
  private spinner = new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * گرفتن دایره چرخشی انتظار
   * @returns فعال یا غیرفعال بودن دایره چرخشی انتظار
   */
  getSpinnerObserver(): Observable<boolean> {
    return this.spinner.asObservable();
  }

  /**
   * شروع دایره چرخشی انتظار
   */
  startSpinner(): void {
    if (++this.count === 1) {
      this.spinner.next(true);
    }
  }

    /**
   * پایان دایره چرخشی انتظار
   */
  endSpinner(): void {
    if (++this.count === 0 || this.count === 0) {
      this.spinner.next(false);
    }
  }

    /**
   * ریست کردن دایره چرخشی انتظار
   */
  resetSpinner(): void {
    this.count = 0;
    this.spinner.next(false);
  }
}
