import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[metavisionOperationButton]',
  standalone: true,
})
export class OperationButtonDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'margin-left', '10px');
  }
}
