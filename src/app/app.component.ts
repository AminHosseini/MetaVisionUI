import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from './shared/components/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'متاویژن';

  constructor(
    private router: Router,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {}

  ngOnInit(): void {
    //#region نمایش دایره چرخشی انتظار در عوض کردن روت های نویگیشن
    this.router.events.subscribe({
      next: (routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          this.loadingSpinnerService.startSpinner();
        }
        if (
          routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError
        ) {
          this.loadingSpinnerService.resetSpinner();
        }
      },
    });
    //#endregion
  }
}
