import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    authService.isAuthenticated().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        observer.next(false);
      } else {
        observer.next(true);
      }
      observer.complete();
    });
  });
};
