import { Component, EventEmitter, Output, signal, ChangeDetectionStrategy, Input, inject, effect, model } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, finalize } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SearchBarComponent {
  @Output() citySelected = new EventEmitter<any>();
  selectedCity = model<any>();
  searchControl = new FormControl('');
  searchResults = signal<any[]>([]);
  isLoading = signal(false);
  private destroy$ = new Subject<void>();
  private readonly DEFAULT_CITY = {
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Country: { LocalizedName: 'Israel' }
  };
  constructor(
    private locationService: LocationService,
    private errorService: ErrorService
  ){
    this.setupAutocomplete();
    effect(() => {
      const city = this.selectedCity();
      if (city) {
        const name = `${city.LocalizedName}, ${city.Country?.LocalizedName || ''}`;
        this.searchControl.setValue(name, { emitEvent: false });
      }
    });
  }
  setupAutocomplete() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          if (typeof term !== 'string') {
            this.searchResults.set([]);
            return of([]);
          }
          if (!term || term.trim() === '') {
            this.selectCity(this.DEFAULT_CITY);
            this.searchResults.set([]);
            return of([]);
          }

          return this.locationService.getAutocompleteLocation(term).pipe(
            catchError(() => {
              this.errorService.showError('Search failed. Please try again.');
              return of([]);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(results => {
        this.searchResults.set(results);
      });
  }

  selectCity(city: any) :void {
    this.citySelected.emit(city);
    const name = `${city.LocalizedName}, ${city.Country?.LocalizedName || ''}`;
    this.searchControl.setValue(name, { emitEvent: false });
    this.searchResults.set([]);
  }

  validateEnglishInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', ' ', 'Enter'];
    const isEnglishLetter = /^[a-zA-Z]$/.test(event.key);  
    if (!isEnglishLetter && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
