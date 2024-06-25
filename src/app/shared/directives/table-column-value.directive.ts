import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionTableColumnValue]',
  standalone: true,
})
export class TableColumnValueDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', '30px');

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-weight',
      'bold',
    );
  }
}
