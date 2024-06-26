import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionTableHeaderButton]',
  standalone: true,
})
export class TableHeaderButtonDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'justify-self',
      'end',
    );

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'margin-bottom',
      '10px',
    );
  }
}
