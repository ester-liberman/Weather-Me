import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './pages/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';
import { SearchBarComponent } from  './components/search-bar/search-bar.component';
import { WeatherCurrentComponent } from './components/weather-current/weather-current.component';
import { WeatherForecastComponent } from './components/forecast/weather-forecast.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ClothingAiComponent } from './components/clothing-ai/clothing-ai.component';
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    SearchPage, 
    SearchBarComponent,
    WeatherCurrentComponent,
    WeatherForecastComponent,
    FavoriteComponent,
    ClothingAiComponent,
  ],
  imports: [
    CommonModule, 
    WeatherRoutingModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
})
export class WeatherModule {}
