import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonHelperDirective } from '../../directives/button-helper.directive';

@Component({
  selector: 'metavision-not-found',
  standalone: true,
  imports: [MatButtonModule, ButtonHelperDirective],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * رفتن به صفحه داشبورد
   */
  onClick(): void {
    this.router.navigate(['/dashboard']);
  }
}
