import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionKeywordElement]',
  standalone: true,
})
export class KeywordElementDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'border',
      '2px solid rgba(0, 0, 0, 0.12)'
    );
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'width',
      'fit-content'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'height', 'auto');
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'display',
      'inline-block'
    );
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'margin-left',
      '5px'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'padding', '5px');
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      '#b284be'
    );
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'border-radius',
      '3px'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'margin-top', '5px');
  }
}
