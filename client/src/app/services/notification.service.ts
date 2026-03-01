import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly alerts = inject(TuiAlertService);

  success(message: string, label?: string): void {
    this.alerts.open(message, { appearance: 'positive', label }).subscribe();
  }

  info(message: string, label?: string): void {
    this.alerts.open(message, { appearance: 'info', label }).subscribe();
  }

  error(message: string, label?: string): void {
    this.alerts.open(message, { appearance: 'error', label }).subscribe();
  }
}
