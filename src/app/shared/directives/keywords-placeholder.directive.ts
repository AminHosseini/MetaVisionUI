import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionKeywordsPlaceholder]',
  standalone: true,
})
export class KeywordsPlaceholderDirective implements OnInit {
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
      'list-style',
      'unset',
    );
  }
}
