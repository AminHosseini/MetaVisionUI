import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionOperationButtonIcon]',
  standalone: true,
})
export class OperationButtonIconDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'grid');

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'align-content',
      'center',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'justify-content',
      'center',
    );
  }
}
