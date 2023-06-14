import { Component, Input } from '@angular/core';

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

  getSliderStyle() {
    return {
      backgroundImage: `linear-gradient(to right, #31c4be ${
        ((this.sliderValue - this.sliderMinValue) / this.sliderMinValue) * 100
      }%, #354953 0%)`,
    };
  }

  handleRangeSlider(event: any) {
    console.log(event.target.value);
    this.sliderValue = event.target.value;
  }
}
