import { Injectable, signal } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites = signal<Location[]>([]);

  getFavorites = this.favorites;
  addToFavorites(city: Location) : void {
    const updated = [...this.favorites(), city];
    this.favorites.set(updated);
  }

  removeFromFavorites(locationKey: string) :void{
    const updated = this.favorites().filter(c => c.Key !== locationKey);
    this.favorites.set(updated);
  }
}
