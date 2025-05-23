import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private ongoingRequests = 0;

  readonly isLoading = signal(false);

  addRequest(): void {
    this.ongoingRequests += 1;
    this.isLoading.set(true);
  }

  removeRequest(): void {
    if (this.ongoingRequests > 0) {
      this.ongoingRequests -= 1;
    }

    if (this.ongoingRequests === 0) {
      this.isLoading.set(false);
    }
  }
}