import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.error?.message || error?.message || 'Неизвестная ошибка';

      notificationService.error(errorMessage);

      return throwError(() => error);
    }),
  );
};
