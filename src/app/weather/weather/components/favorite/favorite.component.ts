import { Component, ChangeDetectionStrategy, computed, input, signal } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class FavoriteComponent {
  animateFavorite = false;

  selectedCity = input<any | null>();

  constructor(private favoritesService: FavoritesService) {}

  readonly isFavorite = computed(() => {
    const city = this.selectedCity();
    return this.favoritesService.getFavorites().some(fav => fav.Key === city.Key);
  });

  toggleFavorite(): void {
    const city = this.selectedCity();

    if (this.isFavorite()) {
      this.favoritesService.removeFromFavorites(city.Key);
    } else {
      this.favoritesService.addToFavorites(city);
    }
  }
}
