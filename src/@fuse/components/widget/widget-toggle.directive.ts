import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[fuseWidgetToggle]',
})
export class FuseWidgetToggleDirective {
  /**
   * Constructor
   *
   * @param {ElementRef} elementRef
   */
  constructor(public elementRef: ElementRef) {}
}
