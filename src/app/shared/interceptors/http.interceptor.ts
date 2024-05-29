import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingSpinnerService } from '../components/loading-spinner/loading-spinner.service';
import { tap } from 'rxjs/internal/operators/tap';
/**
 * فعال کردن دایره چرخشی انتظار هنگام ارسال درخواستی به ای پی آی
 * @param req درخواست
 * @param next هندلر
 * @returns هندلر
 */
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSpinnerService = inject(LoadingSpinnerService);
  loadingSpinnerService.startSpinner();

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          loadingSpinnerService.resetSpinner();
        }
      },
      error: (err: HttpErrorResponse) => {
        loadingSpinnerService.resetSpinner();
      },
    })
  );
};
