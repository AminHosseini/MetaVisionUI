import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Subject } from 'rxjs/internal/Subject';
import { CustomValidationMessageService } from './custom-validation-message.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  serverValidationErrors = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private customValidationMessageService: CustomValidationMessageService
  ) {}

  /**
   * تصمیم گیری برای خطاها و اکسپشن های رخ داده و واکنش به آن
   * @param err ارور
   */
  handleError(err: any): void {
    switch (err.status) {
      case 404:
        this.router.navigate(['/not-found'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 500:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        this.alertService.errorAlert();
        break;
      case 400:
        const messages = this.customValidationMessageService.createErrorMessage(
          err.error.errors
        );
        this.serverValidationErrors.next(messages);
        break;
      default:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        this.alertService.errorAlert();
        break;
    }
  }
}
