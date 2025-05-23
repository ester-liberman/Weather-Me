import { Component, signal, ChangeDetectionStrategy, input } from '@angular/core';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-weather-current',
  standalone: false,
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCurrentComponent {
  unitIsMetric = input<boolean>();
  city = input<string | null>();
  weather = input<CurrentWeather | null>();
}
