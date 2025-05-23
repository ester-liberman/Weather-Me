import { Component, OnInit, signal } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { WeatherService } from './core/services/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  isDarkTheme = signal(false);
    
  constructor(public loaderService: LoaderService, private weatherService: WeatherService) {}

  ngOnInit() {
  }

  changeTemperatureUnit() {
    this.weatherService.isMetric = !this.weatherService.isMetric;

    this.weatherService.temperatureUnitChanged.next(null);
  }

  toggleTheme() {
    const darkMode = !this.isDarkTheme();
    this.isDarkTheme.set(darkMode);
    document.body.classList.toggle('dark-theme', darkMode);
  }
}
