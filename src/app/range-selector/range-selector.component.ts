import { Component, Input, Output, EventEmitter } from '@angular/core';
import { rangeSelectorDefBg, rangeSelectorActiveBg } from '../app-styles';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
})
export class RangeSelectorComponent {
  // inputs
  @Input() sliderMaxValue: number = 10;
  @Input() sliderMinValue: number = 5;
  @Input() sliderValue: number = this.sliderMinValue;
  @Input() sliderStep: number = 1;

  // outputs
  @Output() setBoardSize = new EventEmitter<number>();

  // used to emit an event if the board size has been changed
  public handleRangeSlider(event: any) {
    this.sliderValue = event.target.value;
    this.setBoardSize.emit(event.target.value);
    console.log(this.sliderValue);
  }

  // styles
  // used to set the slider's background dynamically
  public setSliderStyle() {
    return {
      backgroundImage: `linear-gradient(to right, ${rangeSelectorActiveBg} ${
        ((this.sliderValue - this.sliderMinValue) / this.sliderMinValue) * 100
      }%, ${rangeSelectorDefBg} 0%)`,
    };
  }
}
