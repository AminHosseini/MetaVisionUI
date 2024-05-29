import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionButtonHelper]',
  standalone: true,
})
export class ButtonHelperDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'margin-left',
      '10px'
    );
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'letter-spacing',
      '0'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', '15px');
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-family',
      'vazir'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', '15px');
  }
}
