import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ButtonHelperDirective } from '../../directives/button-helper.directive';
import { FontHelperDirective } from '../../directives/font-helper.directive';

@Component({
  selector: 'metavision-pictures',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    ButtonHelperDirective,
    FontHelperDirective,
  ],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.css',
})
export class PicturesComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  /**
   * برگشت به صفحه لیست نوع محصولات
   */
  returnToProductCategories(): void {
    this.router.navigate(['/product-categories'], {
      relativeTo: this.activatedRoute,
    });
  }
}
