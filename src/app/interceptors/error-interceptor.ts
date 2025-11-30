import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthServiceService } from '../services/authService.service';
import { IRefreshTokenResponse } from '../interfaces/auth/IRefreshTokenResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const snackbar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.RefreshToken().pipe(
          switchMap((res: IRefreshTokenResponse) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);

            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`,
              },
            });
            return next(clonedReq);
          }),
          catchError((refreshErr) => {
            console.log('this is the error from refresh', refreshErr.error);
            snackbar.open(refreshErr.error?.msg || 'Session expired. Please login again', 'close', {
              duration: 4000,
              panelClass: ['snack-error'],
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });

            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
