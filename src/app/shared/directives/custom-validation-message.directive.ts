import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionCustomValidationMessage]',
  standalone: true,
})
export class CustomValidationMessageDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', '#e91e63');
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', '13px');
  }
}
