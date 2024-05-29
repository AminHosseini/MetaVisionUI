import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[metavisionDeleteKeywordBtn]',
  standalone: true,
})
export class DeleteKeywordBtnDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      '#b284be'
    );
    this.renderer2.setStyle(this.elementRef.nativeElement, 'border', '0');
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'padding-right',
      '10px'
    );
  }

  @HostListener('mouseenter') mouseover(eventData: MouseEvent) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', '#ffffff');
  }

  @HostListener('mouseleave') mouseleave(eventData: MouseEvent) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', 'black');
  }
}
