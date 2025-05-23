import { Component, DestroyRef, effect, inject, signal, input } from '@angular/core';
import { ClothingService } from 'src/app/core/services/clothing.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-clothing-ai',
  templateUrl: './clothing-ai.component.html',
  styleUrls: ['./clothing-ai.component.scss'],
  standalone: false,
})
export class ClothingAiComponent {
  private destroyRef = inject(DestroyRef);

  unitIsMetric = input<boolean>();
  city = input<string | null>();
  weather = input<CurrentWeather | null>();
  private destroy$ = new Subject<void>();
  readonly recommendation = signal<string | null>(null);

  constructor(private clothingService: ClothingService, private errorService: ErrorService,) {
    effect(() => {
      if (this.weather() && this.unitIsMetric() !== null) {
        this.loadRecommendation();
      }
    });
  }

  private loadRecommendation(): void {
    this.recommendation.set(null);

    this.clothingService.getAiRecommendation(this.weather(), this.unitIsMetric())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => this.recommendation.set(result),
        error: () => this.errorService.showError('Failed to fetch recommendation.')
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
