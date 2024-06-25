import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionEditPageHeader]',
  standalone: true,
})
export class EditPageHeaderDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'grid');

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'grid-template-columns',
      'repeat(2, 50%)',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'justify-content',
      'center',
    );
  }
}
