import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionAddIcon]',
  standalone: true,
})
export class AddIconDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-weight',
      'bolder'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
  }
}
