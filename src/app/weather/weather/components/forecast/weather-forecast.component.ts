import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Forecast, DailyForecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent {
  forecast = input<Forecast | null>();
  get dailyForecasts() {
    return this.forecast()?.DailyForecasts ?? [];
  }  
}
