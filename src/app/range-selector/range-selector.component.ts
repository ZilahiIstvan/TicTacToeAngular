import { Component, Input, Output, EventEmitter } from '@angular/core';
import { rangeSelectorDefBg, rangeSelectorActiveBg } from '../app-styles';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
})
export class RangeSelectorComponent {
  @Input() sliderMaxValue: number = 10;
  @Input() sliderMinValue: number = 5;
  @Input() sliderValue: number = this.sliderMinValue;
  @Input() sliderStep: number = 1;

  @Output() setBoardSize = new EventEmitter<number>();

  public setSliderStyle() {
    return {
      backgroundImage: `linear-gradient(to right, ${rangeSelectorActiveBg} ${
        ((this.sliderValue - this.sliderMinValue) / this.sliderMinValue) * 100
      }%, ${rangeSelectorDefBg} 0%)`,
    };
  }

  public handleRangeSlider(event: any) {
    this.sliderValue = event.target.value;
    this.setBoardSize.emit(event.target.value);
    console.log(this.sliderValue);
  }
}
