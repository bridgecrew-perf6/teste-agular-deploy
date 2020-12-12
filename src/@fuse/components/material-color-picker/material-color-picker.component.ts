import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { MatColors } from '@fuse/mat-colors';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FuseMaterialColorPickerComponent),
  multi: true,
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'fuse-material-color-picker',
  templateUrl: './material-color-picker.component.html',
  styleUrls: ['./material-color-picker.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR],
})
export class FuseMaterialColorPickerComponent implements ControlValueAccessor {
  colors: any;
  hues: string[];
  view: string;
  selectedColor: any;
  selectedPalette: string;
  selectedHue: string;

  // Color changed
  @Output()
  colorChanged: EventEmitter<any>;

  // Private
  // tslint:disable-next-line: variable-name
  private _color: string;
  // tslint:disable-next-line: variable-name
  private _modelChange: (value: any) => void;
  // tslint:disable-next-line: variable-name
  private _modelTouched: (value: any) => void;

  /**
   * Constructor
   */
  constructor() {
    // Set the defaults
    this.colorChanged = new EventEmitter();
    this.colors = MatColors.all;
    this.hues = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A100',
      'A200',
      'A400',
      'A700',
    ];
    this.selectedHue = '500';
    this.view = 'palettes';

    // Set the private defaults
    this._color = '';
    this._modelChange = () => {};
    this._modelTouched = () => {};
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  @Input()
  set color(value) {
    if (!value || value === '' || this._color === value) {
      return;
    }

    // Split the color value (red-400, blue-500, fuse-navy-700 etc.)
    const colorParts = value.split('-');

    // Take the very last part as the selected hue value
    this.selectedHue = colorParts[colorParts.length - 1];

    // Remove the last part
    colorParts.pop();

    // Rejoin the remaining parts as the selected palette name
    this.selectedPalette = colorParts.join('-');

    // Store the color value
    this._color = value;
  }

  get color(): string {
    return this._color;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Control Value Accessor implementation
  // -----------------------------------------------------------------------------------------------------

  registerOnChange(fn: any): void {
    this._modelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._modelTouched = fn;
  }

  writeValue(color: any): void {
    // Return if null
    if (!color) {
      return;
    }

    // Set the color
    this.color = color;

    // Update the selected color
    this.updateSelectedColor();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  selectPalette(event, palette): void {
    // Stop propagation
    event.stopPropagation();

    // Go to 'hues' view
    this.view = 'hues';

    // Update the selected palette
    this.selectedPalette = palette;

    // Update the selected color
    this.updateSelectedColor();
  }

  selectHue(event, hue): void {
    // Stop propagation
    event.stopPropagation();

    // Update the selected huse
    this.selectedHue = hue;

    // Update the selected color
    this.updateSelectedColor();
  }

  removeColor(event): void {
    // Stop propagation
    event.stopPropagation();

    // Return to the 'palettes' view
    this.view = 'palettes';

    // Clear the selected palette and hue
    this.selectedPalette = '';
    this.selectedHue = '';

    // Update the selected color
    this.updateSelectedColor();
  }

  /**
   * Update selected color
   */
  updateSelectedColor(): void {
    if (
      this.selectedColor &&
      this.selectedColor.palette === this.selectedPalette &&
      this.selectedColor.hue === this.selectedHue
    ) {
      return;
    }

    // Set the selected color object
    this.selectedColor = {
      palette: this.selectedPalette,
      hue: this.selectedHue,
      class: this.selectedPalette + '-' + this.selectedHue,
      bg:
        this.selectedPalette === ''
          ? ''
          : MatColors.getColor(this.selectedPalette)[this.selectedHue],
      fg:
        this.selectedPalette === ''
          ? ''
          : MatColors.getColor(this.selectedPalette).contrast[this.selectedHue],
    };

    // Emit the color changed event
    this.colorChanged.emit(this.selectedColor);

    // Mark the model as touched
    this._modelTouched(this.selectedColor.class);

    // Update the model
    this._modelChange(this.selectedColor.class);
  }

  goToPalettesView(event): void {
    // Stop propagation
    event.stopPropagation();

    this.view = 'palettes';
  }

  /**
   * On menu open
   */
  onMenuOpen(): void {
    if (this.selectedPalette === '') {
      this.view = 'palettes';
    } else {
      this.view = 'hues';
    }
  }
}