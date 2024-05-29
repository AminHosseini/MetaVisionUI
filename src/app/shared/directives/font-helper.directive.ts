import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionFontHelper]',
  standalone: true,
})
export class FontHelperDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-family',
      'vazir'
    );
    // this.renderer2.setStyle(this.elementRef.nativeElement, 'color', '#4a4f4b');
  }
}
