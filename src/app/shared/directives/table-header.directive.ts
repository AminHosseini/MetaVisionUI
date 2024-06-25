import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionTableHeader]',
  standalone: true,
})
export class TableHeaderDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'grid');

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'grid-template-rows',
      '100%',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'grid-template-columns',
      '25% 25% 46%',
    );

    this.renderer2.setStyle(this.elementRef.nativeElement, 'grid-gap', '20px');

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'justify-items',
      'stretch',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'align-items',
      'center',
    );
  }
}
