import { Component, computed, effect, signal, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage {
  selectedCity = signal<any>({
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Rank: 31,
    Type: 'City',
    Version: 1,
    Country: {
      "ID": "IL",
      "LocalizedName": "Israel",
    },
  });
  selectedCityName = signal<string | null>('Tel Aviv');
  selectedCityKey = signal<string | null>(null);
  currentWeather = signal<CurrentWeather | null>(null);
  forecast = signal<Forecast | null>(null);
  private destroy$ = new Subject<void>();
  unitIsMetric = signal<boolean>(true);

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private errorService: ErrorService
  ) {}

  ngOnInit(){
    this.route.paramMap
      .pipe(takeUntil(this.destroy$)).subscribe(params => {
          const locationKey = params.get('locationKey') || '215854';
          if (!this.selectedCityKey()){
            this.getLocationByKey(locationKey);
          }
          this.getCurrentWeather(locationKey);
          this.getForecast(locationKey);
    });

    this.weatherService.temperatureUnitChanged
      .pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.unitIsMetric.set(this.weatherService.isMetric);
    });
   
  }

  navigateToCity(locationKey: string):void {
    const currentKey = this.route.snapshot.paramMap.get('locationKey');
    if (currentKey !== locationKey) {
      this.router.navigate(['/search', locationKey]);
    }
  }

  onCitySelected(city: any):void {
    if (!city) { return; }
    this.selectedCity.set(city);
    this.selectedCityName.set(city.LocalizedName);
    this.selectedCityKey.set(city.Key);
    this.navigateToCity(city.Key);
  }

  getForecast(locationKey: string): void {
    this.weatherService.getForecast(locationKey)
    .pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.forecast.set(data),
      error: () => this.errorService.showError('Error loading forecast')
    });
  }

  getCurrentWeather(locationKey: string): void {
    this.weatherService.getCurrentWeather(locationKey)
    .pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.currentWeather.set(data?.[0]),
      error: () => this.errorService.showError('Error loading current weather')
    });
  }

  getLocationByKey(locationKey: string): void {
    this.locationService.getLocationByKey(locationKey)
    .pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.onCitySelected(data);
      },
      error: () => this.errorService.showError('Error loading location')
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

