import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInTrip]',
  standalone: true
})
export class InTripDirective {

  @Input() appInTrip: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.appInTrip) {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#f3f3f3');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background');
    }
  }

}  
