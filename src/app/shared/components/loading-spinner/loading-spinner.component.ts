import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerService } from './loading-spinner.service';

@Component({
  selector: 'metavision-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent implements OnInit {
  showSpinner: boolean = false;

  constructor(
    private loadingSpinnerService: LoadingSpinnerService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  /**
   * شروع دایره چرخشی انتظار
   */
  init(): void {
    this.loadingSpinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === true;
      this.changeDetectorRef.detectChanges();
    });
  }
}
