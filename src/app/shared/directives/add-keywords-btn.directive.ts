import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionAddKeywordsBtn]',
  standalone: true,
})
export class AddKeywordsBtnDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'width', '100%');
    this.renderer2.setStyle(this.elementRef.nativeElement, 'height', '3.4rem');
  }
}
