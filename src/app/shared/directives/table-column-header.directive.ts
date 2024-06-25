import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionTableColumnHeader]',
  standalone: true,
})
export class TableColumnHeaderDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', '15px');
    
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-weight',
      'bolder',
    );
  }
}
