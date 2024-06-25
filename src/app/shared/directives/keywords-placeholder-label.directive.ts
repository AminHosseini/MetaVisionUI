import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionKeywordsPlaceholderLabel]',
  standalone: true,
})
export class KeywordsPlaceholderLabelDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'color',
      'var(--mdc-filled-text-field-disabled-input-text-color)',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'padding-right',
      '5px',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'padding-top',
      '20px',
    );
  }
}
